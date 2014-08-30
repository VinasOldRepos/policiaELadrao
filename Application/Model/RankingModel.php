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
			$thisWeeks = ($isWeekly) ? "THIS WEEK'S " : 'ALL TIMES';
			$return = '	<div class="title">'.$thisWeeks.'RANKING</div>'.PHP_EOL;
			$return .= '		<div id="lista" class="lista">'.PHP_EOL;
			$return	.= $this->listUsers($entries);
			$return .= '	</div>'.PHP_EOL;
			$return .= $this->rankingFooter($isWeekly);
			return $return;
		}

		private function listUsers($entries) {
			$return			= '';
			$tot_entries	= count($entries);
			for ($i = 0; $i < $tot_entries; $i++) {
				$return		.= '		<div class="linha">'.PHP_EOL;
				$return		.= '			<div class="nome">'.($i + 1).'. '.$entries[$i]['str_nickname'].'</div>'.PHP_EOL;
				$return		.= '			<div class="pontuacao">'.$entries[$i]['int_points'].'</div>'.PHP_EOL;
				$return		.= '		</div>'.PHP_EOL;
			}

			for ($i=0; $i < 12; $i++) { 
				$return		.= '		<div class="linha">'.PHP_EOL;
				$return		.= '			<div class="nome">'.($i + 2).'. '.$entries[0]['str_nickname'].'</div>'.PHP_EOL;
				$return		.= '			<div class="pontuacao">'.$entries[0]['int_points'].'</div>'.PHP_EOL;
				$return		.= '		</div>'.PHP_EOL;
			}
			return $return;
		}

		private function rankingFooter($isWeekly) {
			$retorno = '<div class="rankingFooter">'.PHP_EOL;
			if ($isWeekly) {
				$retorno .= '<div class="link" id="rankingLinkButton" data-rankingType="thisweeks">CHECK ALL TIMES RANKING</div>'.PHP_EOL;
			} else {
				$retorno .= '<div class="link" id="rankingLinkButton" data-rankingType="alltimes">CHECK THIS WEEK'."'".'S RANKING</div>'.PHP_EOL;
			}
			$retorno .= '</div>'.PHP_EOL;
			return $retorno;
		}
	}