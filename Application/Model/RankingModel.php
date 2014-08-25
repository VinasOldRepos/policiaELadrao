<?php
/************************************************************************************
* Name:				Ranking Model													*
* File:				Application\Model\Ranking.php									*
* Author(s):		Vinas de Andrade												*
*																					*
* Description: 		This is the User's model.										*
*																					*
* Creation Date:	15/11/2012														*
* Version:			1.12.1115														*
* License:			http://www.opensource.org/licenses/bsd-license.php BSD			*
*************************************************************************************/

	namespace Application\Model;

	class RankingModel {

		public function listUsers($entries = false) {
			$return				= false;
			if ($entries) {
				$tot_entries	= count($entries);
				for ($i = 0; $i < $tot_entries; $i++) {
					$return		.= '		<div class="linha">'.PHP_EOL;
					$return		.= '			<div class="nome">'.($i + 1).'. '.$entries[$i]['str_nickname'].'</div>'.PHP_EOL;
					$return		.= '			<div class="pontuacao">'.$entries[$i]['int_points'].'</div>'.PHP_EOL;
					$return		.= '		</div>'.PHP_EOL;
				}
			}
			return $return;
		}
	}