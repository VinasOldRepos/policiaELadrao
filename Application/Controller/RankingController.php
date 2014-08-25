<?php
/************************************************************************************
* Name:				Ranking Controller												*
* File:				Application\Controller\IndexController.php 						*
* Author(s):		Vinas de Andrade												*
*																					*
* Description: 		This handles URL requests related to Ranking.					*
*																					*
* Creation Date:	16/07/2014														*
* Version:			1.14.0716														*
* License:			http://www.opensource.org/licenses/bsd-license.php BSD			*
*************************************************************************************/

	namespace Application\Controller;

	//use SaSeed\View;
	use SaSeed\URLRequest;
	use SaSeed\Session;

	use Application\Controller\Service\User;
	use Application\Controller\Service\Ranking;
	use Application\Model\RankingModel;

	class RankingController {

		private $user;
		private $serviceUser;
		private $serviceRanking;
		private $sessionObj;

		public function __construct() {
			Session::start();
			$this->serviceUser		= new User();
			$this->serviceRanking	= new Ranking();
		}

		/*
		Handle end game ranking - endGame()
			@return format	- print
		*/
		public function endGame() {
			$URLRequest				= new URLRequest();

			$params 				= $URLRequest->getPostParams();
			$nickname				= $params['nickName'];
			$email					= $params['email'];
			$points					= $params['points'];
			
			$session = $this->getSession();
			if (!isset($session['userId'])) {
				$this->checkAndSaveUser($nickname, $email, $points);
				$session = $this->setSession();
			} else {
				$this->user['id'] = $session['userId'];
			}

			$userMaxPoints = $this->serviceRanking->updateUserMaxPoints($session['userId'], $points);
			$this->serviceRanking->saveGameLog($session['userId'], $points);
			$this->rankUser($points);

			$response['response']	= 1;
			$response['redirect']	= '/Ranking/listRanking/';
			$response['userId']		= $session['userId'];
			$response['lastScore']	= $points;
			$response['maxScore']	= $userMaxPoints;
			echo json_encode($response);
		}

		/*
		Login User from Facebook
			@return format	- print
		*/
		public function logInUser() {
			$session = $this->getSession();
			if (!isset($session['userId'])) {
				$URLRequest				= new URLRequest();
				$params 				= $URLRequest->getPostParams();
				$nickname				= $params['nickName'];
				$email					= $params['email'];
				$points					= $params['points'];
				$this->checkAndSaveUser($nickname, $email, 0);
				$session = $this->setSession();
			}
			$response['response'] = 1;
			$response['maxScore'] = $this->serviceRanking->updateUserMaxPoints($session['userId'], $points);
			$this->serviceRanking->saveGameLog($session['userId'], $points);
			$this->rankUser($points);
			echo json_encode($response);
		}

		public function listRanking() {
			$this->serviceRanking = new Ranking();
			$RankingModel = new RankingModel();
			echo $RankingModel->listUsers($this->serviceRanking->listRanking());
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
				$this->user	= $this->serviceUser->saveNewUser($nickname, $email, $points);
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
		
		private function rankUser($points = false) {
			$smallestScore = $this->serviceRanking->getRankingSmallestScore();
			if ($points >= $smallestScore) {
				$this->serviceRanking->saveRanking($this->user['id'], $points);
			}
		}
	}