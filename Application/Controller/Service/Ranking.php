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
				if ($this->db->insertRow('tb_gamelog', array($userId, $points, date("Y-m-d H:i:s")), '')) {
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
				if ($this->countRanking() >= 15) {
					$this->deleteRankingSmallestScore();
				}
				if ($this->db->insertRow('tb_ranking', array($userId, $points, date("Y-m-d H:i:s")), '')) {
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

		public function listRanking() {
			return $this->db->getAllRows_Arr(
				'tb_ranking AS r JOIN tb_user AS u ON r.id_user = u.id',
				'r.id, u.str_nickname, r.int_points',
				'1 ORDER BY int_points DESC LIMIT 15'
			);
		}

		private function limitTwentyRecords() {
			$ranking	= $this->db->getAllRows_Arr('tb_ranking', 'id', '1 ORDER BY int_points DESC');
			$total		= count($ranking);
			if ($total > 15) {
				$ids = false;
				for ($i = 15; $i < $total; $i++) {
					if ($ids) {
						$ids .= ', '.$ranking[$i]['id'];
					} else {
						$ids = $ranking[$i]['id'];
					}
				}
				if ($this->db->deleteRow('tb_ranking', 'id NOT IN ('.$ids.')')) {
					return 15;
				}
			}
			return $total;
		}

		private function deleteRankingSmallestScore() {
			$ranking	= $this->db->getAllRows_Arr('tb_ranking', 'id', '1 ORDER BY int_points ASC');
			return $this->db->deleteRow('tb_ranking', 'id = ('.$ranking[0]['id'].')');
		}
	}