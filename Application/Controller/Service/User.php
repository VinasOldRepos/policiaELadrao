<?php

/************************************************************************************
* Name:				User Service													*
* File:				Application\Controller\Service\User.php 						*
* Author(s):		Vinas de Andrade												*
*																					*
* Description: 		This' function is to feed the Controller with information.		*
*																					*
* Creation Date:	17/07/2014														*
* Version:			1.14.0717														*
* License:			http://www.opensource.org/licenses/bsd-license.php BSD			*
************************************************************************************/

	namespace Application\Controller\Service;

	//use Application\Controller\Service\dbFunctions;

	class User {

		private $db;
		private $table = 'tb_user';

		public function __construct() {
			$this->db = $GLOBALS['db'];
		}

		/*
		Get User by Id - getById($email)
			@param integer	- User Id
			@return format	- Mixed array
		*/
		public function getById($userId = false) {
			if ($userId) {
				return $this->db->getRow($this->table, '*', "id = {$userId}");
			}
			return false;
		}

		/*
		Get User by Email - getByEmail($email)
			@param string	- User email
			@return format	- Mixed array
		*/
		public function getByEmail($email = false) {
			if ($email) {
				return $this->db->getRow($this->table, '*', "str_email = '{$email}'");
			}
			return false;
		}

		/*
		Save user in the database - saveNewUser($nickname, $email, $points)
			@param string	- User's nickname
			@param string	- User's email
			@return array
		*/
		public function saveNewUser($nickname, $email, $points = 0) {
			if (($nickname) && ($email)) {
				if ($this->db->insertRow($this->table, array($nickname, $email, $points), '')) {
					return $this->getById($this->db->last_id());
				}
			}
			return false;
		}
		
		public function updateUserMaxPoints($userId, $points) {
			return $this->db->updateRow(
						$this->table,
						array('int_max_points'),
						array($points),
						'id = '.$userId
					);
		}
	}