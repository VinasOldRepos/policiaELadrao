<?php
/********************************************************************************
* Name:				Ranking Controller											*
* File:				Application\Controller\IndexController.php 					*
* Author(s):		Vinas de Andrade											*
*																				*
* Description: 		This handles URL requests related to Ranking.				*
*																				*
* Creation Date:	16/07/2014													*
* Version:			1.14.0716													*
* License:			http://www.opensource.org/licenses/bsd-license.php BSD		*
*********************************************************************************/

namespace Application\Controller;

use SaSeed\View;
use SaSeed\URLRequest;
use SaSeed\Session;

use Application\Controller\Service\User;
use Application\Controller\Service\Ranking;
use Application\Model\RankingModel;

class RankingController {

	private $user;
	private $serviceUser;
	private $serviceRanking;
	private $session;

	public function __construct() {
		Session::start();
		$this->serviceUser		= new User();
		$this->serviceRanking	= new Ranking();
	}

	/**
	 * Handle end game event - endGame()
	 *	@return format	- print
	 */
	public function endGame() {
		$URLRequest				= new URLRequest();

		$params 				= $URLRequest->getPostParams();
		$nickname				= $params['nickName'];
		$email					= $params['email'];
		$points					= $params['points'];

		$this->setUserSession('Vinas', 'vinas.andrade@gmail.com', 666);
		//$this->setUserSession($nickname, $email, $points);
		$userMaxPoints = $this->handleUserPoints($points);

		$response['response']	= 1;
		$response['redirect']	= '/policiaELadrao/Ranking/listWeeklyRanking/';
		$response['userId']		= $this->session['userId'];
		$response['lastScore']	= $points;
		$response['maxScore']	= $userMaxPoints;
		View::jsonEncode($response);
	}

	/**
	 * Login User from Facebook
	 *	@return format	- print
	 */
	public function logInUser() {
		$this->session = $this->getSession();
		if (!isset($this->session['userId'])) {
			$URLRequest				= new URLRequest();
			$params 				= $URLRequest->getPostParams();
			$nickname				= $params['nickName'];
			$email					= $params['email'];
			$points					= $params['points'];
			$this->checkAndSaveUser($nickname, $email, 0);
			$this->session = $this->setSession();
		}
		$response['response'] = 1;
		$response['maxScore'] = $this->serviceRanking
			->updateUserMaxPoints($this->session['userId'], $points);
		$this->serviceRanking->saveGameLog(
			$this->session['userId'], $points
		);
		$this->rankUser($points);
		View::jsonEncode($response);
	}

	public function listWeeklyRanking() {
		$RankingModel = new RankingModel();
		View::printModel($RankingModel->ranking(
				$this->serviceRanking->listWeeklyRanking(),
				true
			)
		);
	}

	public function listAllTimesRanking() {
		$RankingModel = new RankingModel();
		View::printModel($RankingModel->ranking(
				$this->serviceRanking->listAllTimesRanking(),
				false
			)
		);
	}

	public function renewRanking() {
		$URLRequest = new URLRequest();
		$params = $URLRequest->getParams();
		$this->session = $this->getSession();


// Mock teste dev
$this->session['userId'] = 10;


		if (!empty($this->session['userId']) &&
			$this->session['userId'] == 10 &&
			!empty($params[0]) &&
			$params[0] == '4560302'
		) {
			$this->serviceRanking->updateAllTimesRanking();
			$this->serviceRanking->clearWeeklyRanking();
			$response['response'] = 1;
		} else {
			$response['response'] = 0;
		}
		View::jsonEncode($response);
	}

	private function checkIsUserByEmail($email) {
		$user = $this->serviceUser->getByEmail($email);
		if ($user) {
			$this->user = $user;
			return true;
		}
		return false;
	}

	private function checkAndSaveUser($nickname, $email, $points) {
		if (!$this->checkIsUserByEmail($email)) {
			$this->user	= $this->serviceUser
				->saveNewUser($nickname, $email, $points);
		} else {
			$this->user	= $this->serviceUser->getByEmail($email);
		}
	}
	
	private function getSession() {
		return Session::getAll();
	}

	private function setSession() {
		Session::setVar('userId', $this->user['id']);
		return $this->getSession();
	}

	private function setUserSession($nickname, $email, $points){
		$this->session = $this->getSession();
		if (!isset($this->session['userId'])) {
			$this->checkAndSaveUser($nickname, $email, $points);
			$this->session = $this->setSession();
		} else {
			$this->user['id'] = $this->session['userId'];
		}
	}

	private function handleUserPoints($points) {
		$userMaxPoints = $this->serviceRanking
			->updateUserMaxPoints($this->session['userId'], $points);
		$this->serviceRanking
			->saveGameLog($this->session['userId'], $points);
		$this->rankUser($points, $userMaxPoints);
		if ($points > $userMaxPoints) {
			return $points;
		}
		return $userMaxPoints;
	}

	private function rankUser($points) {
		if ($points > $this->serviceRanking->getRankingSmallestScore()) {
			$userRank = $this->serviceRanking->getUserRankByUserId($this->user['id']);
			if (!empty($userRank['int_points']) &&
				$points > $userRank['int_points']
			) {
				$this->serviceRanking->updateUserRank($this->user['id'], $points);
			} else if (empty($userRank['int_points'])) {
				$this->serviceRanking->saveRanking($this->user['id'], $points);
			}
		}
	}
}