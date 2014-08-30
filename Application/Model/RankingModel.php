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

	public function ranking($entries, $isWeekly = false) {
		$thisWeeks = ($isWeekly) ? "THIS WEEK'S " : 'ALL TIMES ';
		$return = '	<div class="title">'.$thisWeeks.'RANKING</div>'.PHP_EOL;
		$return .= '		<div id="lista" class="lista">'.PHP_EOL;
		$return	.= $this->listUsers($entries);
		$return .= '	</div>'.PHP_EOL;
		return $return;
	}

	private function listUsers($entries) {
		$return			= '';
		for ($i = 0; $i < count($entries); $i++) {
			$return		.= '		<div class="linha">'.PHP_EOL;
			$return		.= '			<div class="nome">'.($i + 1).'. '.$entries[$i]['str_nickname'].'</div>'.PHP_EOL;
			$return		.= '			<div class="pontuacao">'.$entries[$i]['int_points'].'</div>'.PHP_EOL;
			$return		.= '		</div>'.PHP_EOL;
		}
		return $return;
	}
}