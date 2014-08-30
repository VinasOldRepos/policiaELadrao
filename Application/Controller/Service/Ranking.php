<?php

/************************************************************************************
* Name:				Ranking Service													*
* File:				Application\Controller\Service\Ranking.php 						*
* Author(s):		Vinas de Andrade												*
*																					*
* Description: 		This' function is to feed the Controller with information.		*
*																					*
* Creation Date:	17/07/2014														*
* Version:			1.14.0717														*
* License:			http://www.opensource.org/licenses/bsd-license.php BSD			*
*************************************************************************************/

namespace Application\Controller\Service;

use Application\Controller\Service\dbFunctions;
use Application\Controller\Service\User;

class Ranking {

	private $db;

	public function __construct() {
		$this->db = $GLOBALS['db'];
	}

	/*
	Save game log in the database - saveNewUser($userId, $points)
		@param string	- User's id
		@param string	- game's points
		@return array
	*/
	public function saveGameLog($userId, $points) {
		if (($userId) && ($points)) {
			if ($this->db->insertRow(
					'tb_gamelog',
					array($userId, $points, date("Y-m-d H:i:s")),
					''
				)
			) {
				return $this->db->last_id();
			}
		}
		return false;
	}

	/*
	Save Ranking in the database - saveRanking($userId, $points)
		@param string	- User's id
		@param string	- game's points
		@return array
	*/
	public function saveRanking($userId, $points) {
		if (($userId) && ($points)) {
			if ($this->countRanking() >= 13) {
				$this->deleteRankingSmallestScore();
			}
			if ($this->db->insertRow(
					'tb_ranking',
					array($userId, $points, date("Y-m-d H:i:s")),
					''
				)
			) {
				return $this->db->last_id();
			}
		}
		return false;
	}

	public function getRankingById($rankingId = false) {
		if ($rankingId) {
			return $this->db->getRow('tb_ranking', '*', "id = '{$rankingId}'");
		}
		return false;
	}

	public function countRanking() {
		$return = $this->db->getRow('tb_ranking', 'count(id) AS total', "1");
		return $return["total"];
	}

	public function getRankingSmallestScore() {
		$ranking	= $this->db->getRow('tb_ranking', 'int_points AS minimum', '1 ORDER BY int_points ASC LIMIT 1');
		return $ranking['minimum'];
	}

	// @return integet User max points
	public function updateUserMaxPoints($userID, $points) {
		$userService = new User();
		$user = $userService->getById($userID);
		if ($points > $user['int_max_points']) {
			$userService->updateUserMaxPoints($userID, $points);
		}
		return $user['int_max_points'];
	}

	public function listWeeklyRanking() {
		return $this->db->getAllRows_Arr(
			'tb_ranking AS r JOIN tb_user AS u ON r.id_user = u.id',
			'r.id, u.str_nickname, u.str_lastname, r.int_points',
			'1 ORDER BY int_points DESC LIMIT 13'
		);
	}

	public function listAllTimesRanking() {
		return $this->db->getAllRows_Arr(
			'tb_ranking_alltimes AS r JOIN tb_user AS u ON r.id_user = u.id',
			'r.id, u.str_nickname, u.str_lastname, r.int_points',
			'1 ORDER BY int_points DESC LIMIT 13'
		);
	}

	public function updateAllTimesRanking() {
		$thisWeeks = $this->db->getAllRows_Arr('tb_ranking', '*', '1 ORDER BY int_points DESC');
		if (is_array($thisWeeks) && count($thisWeeks) > 0) {
			$allTimes = $this->db->getAllRows_Arr('tb_ranking_alltimes', '*', '1 ORDER BY int_points DESC');
			$newAllTimes = $this->buildNewAllTimesScore($thisWeeks, $allTimes);
			$this->db->deleteRow('tb_ranking_alltimes', '1');
			foreach ($newAllTimes as $result) {
				$this->db->insertRow('tb_ranking_alltimes', array($result['id_user'], $result['int_points'], $result['dt_log']), '');
			}
		}
	}

	public function clearWeeklyRanking() {
		$this->db->deleteRow('tb_ranking', '1');
	}

	public function getUserRankByUserId($userId) {
		return $this->db->getRow('tb_ranking', '*', 'id_user = '.$userId);
	}

	public function deleteRankingPositionByUserId($userId) {
		return $this->db->deleteRow('tb_ranking', 'id_user = '.$userId);
	}

	public function updateUserRank($userId, $points) {
		$this->deleteRankingPositionByUserId($userId);
		$this->saveRanking($userId, $points);
	}

	private function limitRankingRecords() {
		$ranking	= $this->db->getAllRows_Arr('tb_ranking', 'id', '1 ORDER BY int_points DESC');
		$total		= count($ranking);
		if ($total > 13) {
			$ids = false;
			for ($i = 13; $i < $total; $i++) {
				if ($ids) {
					$ids .= ', '.$ranking[$i]['id'];
				} else {
					$ids = $ranking[$i]['id'];
				}
			}
			if ($this->db->deleteRow('tb_ranking', 'id NOT IN ('.$ids.')')) {
				return 13;
			}
		}
		return $total;
	}

	private function deleteRankingSmallestScore() {
		$ranking	= $this->db->getAllRows_Arr('tb_ranking', 'id', '1 ORDER BY int_points ASC');
		return $this->db->deleteRow('tb_ranking', 'id = ('.$ranking[0]['id'].')');
	}

	private function orderResultsByScore($results) {
		foreach ($results as $key => $row) {
		    $points[$key]  = $row['int_points'];
		    $date[$key] = $row['dt_log'];
		}
		array_multisort($points, SORT_DESC, $date, SORT_ASC, $results);
		return $results;
	}

	private function buildNewAllTimesScore($thisweeks, $alltimes) {
		if (is_array($alltimes) && count($alltimes) > 0) {
			$indexes = false;
			// Remove repeated records
			for ($i = 0; $i < count($alltimes); $i++) {
				for ($idx = 0; $idx < count($thisweeks); $idx++) {
					if ($alltimes[$i]['id_user'] == $thisweeks[$idx]['id_user'] &&
						$alltimes[$i]['int_points'] >= $thisweeks[$idx]['int_points']
					) {
						$indexes[] = $idx;
					}
				}
			}
			if ($indexes) {
				for ($i = 0; $i < count($indexes); $i++) { 
					unset($thisweeks[$indexes[$i]]);
				}
			}
			$allresults = array_merge($thisweeks, $alltimes);
		} else {
			$allresults = $thisweeks;
		}
		return $this->limitarRankingResults(
			$this->orderResultsByScore($allresults)
		);
	}

	private function limitarRankingResults($allresults) {
		$total = count($allresults);
		if ($total > 13) {
			$dif = $total - 13;
			for ($i = 0; $i < $dif; $i++) {
				unset($allresults[12+$i]);
			}
		}
		return $allresults;
	}
}