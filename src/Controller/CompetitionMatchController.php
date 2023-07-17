<?php

namespace App\Controller;

use App\Entity\CompetitionMatch;
use App\Entity\Team;
use App\Entity\TeamCompetitionMatch;
use App\Form\CompetitionMatchType;
use App\Repository\CompetitionMatchRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry as PersistenceManagerRegistry;
use DateTime;
use Symfony\Component\Validator\Constraints\Date;

#[Route('/competition/match')]
class CompetitionMatchController extends AbstractController
{


    public function getName(){
        return "nume1";
    }

    public function createDates($teams){

        $dates = array();

        for($i = 0; $i < count($teams) - 2; $i = $i + 1 ){
            for($j = $i + 1; $j < count($teams) - 1; $j = $j + 1){
                $team1 = $teams[$i];
                $team2 = $teams[$j];

                $day = $i + 4 * $j;
                $month = intdiv($day, 30) + 1;

                if($day >= 30){ //case where day > 30 (impossible)
                    $month = $month + 1;
                    $day = $i;
                }

                $year = 2023;
                if($month > 12){
                    $year = $year + 1;
                    $month = 1;
                }

                $dateString = $year."-".$month."-".$day;
                $dateObj = new DateTime($dateString);
                $dmyFormat = $dateObj->format('Y-m-d');

                array_push($dates, $dateObj);
            }
        }
        return $dates;
    }


    public function homeTeams($teams){
    $homeTeams = array();

        for($i = 0; $i < count($teams) - 2; $i = $i + 1 ){
            for($j = $i + 1; $j < count($teams) - 1; $j = $j + 1) {
                $team1 = $teams[$i];
                $team2 = $teams[$j];
                array_push($homeTeams, $team1);

            }
        }

        return $homeTeams;
    }


    public function awayTeams($teams){

        $awayTeams = array();

        for($i = 0; $i < count($teams) - 2; $i = $i + 1 ){
            for($j = $i + 1; $j < count($teams) - 1; $j = $j + 1) {
                $team1 = $teams[$i];
                $team2 = $teams[$j];
                array_push($awayTeams, $team2);

            }
        }

        return $awayTeams;
    }


//    #[Route('/generateMatchesAndInsertInDb', name: 'app_competition_match_index', methods: ['POST'])]

    public function generateMatchesAndInsertInDb($homeTeams, $awayTeams, $dates, CompetitionMatchRepository $competitionMatchRepository, EntityManagerInterface $entityManager): Response{

        for($i = 0; $i < count($homeTeams); $i = $i + 1){
            $homeTeam = $homeTeams[$i];
            $awayTeam = $awayTeams[$i];
            $date = $dates[$i];
            $played = 0;
            $homeTeamGoals = random_int(0, 5);
            $awayTeamGoals = random_int(0, 5);

            $competitionMatch = new CompetitionMatch();
            $competitionMatch->setStartDate($date);
            $competitionMatch->setPlayed(0);

            $competitionMatchRepository->save($competitionMatch, true);

            $homeTeamObj = $entityManager->getRepository(Team::class)->findOneBy(['name'=>$homeTeam]);
//            var_dump($homeTeamObj->getId());
//            die();

            $awayTeamObj = $entityManager->getRepository(Team::class)->findOneBy(['name'=>$awayTeam]);



            $teamCompetitionMatch1 = new TeamCompetitionMatch();
            $teamCompetitionMatch1->setMatches($competitionMatch);
            $teamCompetitionMatch1->setTeams($homeTeamObj);
            $teamCompetitionMatch1->setPoints(0);

//            var_dump("TEAM COMP1 = ".$teamCompetitionMatch1);
//            die();

            $teamCompetitionMatch2 = new TeamCompetitionMatch();
            $teamCompetitionMatch2->setMatches($competitionMatch);
            $teamCompetitionMatch2->setTeams($awayTeamObj);
            $teamCompetitionMatch2->setPoints(0);

            $entityManager->persist($teamCompetitionMatch1);
            $entityManager->flush();
            $entityManager->persist($teamCompetitionMatch2);
            $entityManager->flush();


        }
        return new Response('Matches generated and inserted successfully!', Response::HTTP_OK);

    }


    public function swap(&$a, &$b){
        $aux = $a;
        $a = $b;
        $b = $aux;
    }
//
//    public function fasd(&$f){
//        $f = 2;
////        echo $f;
//    }
    public function sortByDate(&$dates, &$ids, &$homeTeams, &$awayTeams): void{
        for($i = 0; $i < count($dates) - 1; $i = $i + 1)
            for($j = $i + 1; $j < count($dates); $j = $j + 1){
                    $date1 = $dates[$i];
                    $date1AsString = $date1->format('Y-m-d');
                    $date1Day = $date1AsString[8].$date1AsString[9];
                    $date1Day = intval($date1Day);
                    $date1Month = $date1AsString[5].$date1AsString[6];
                    $date1Month = intval($date1Month);
                    $date1Year = $date1AsString[0].$date1AsString[1].$date1AsString[2].$date1AsString[3];
                    $date1Year = intval($date1Year);
//                    echo "DATE 1 --- YEAR = ".$date1Year." MONTH = ".$date1Month." DAY = ".$date1Day."<br>";

                    $date2 =  $dates[$j];
                    $date2AsString = $date2->format('Y-m-d');
                    $date2Day = $date2AsString[8].$date2AsString[9];
                    $date2Day = intval($date2Day);
                    $date2Month = $date2AsString[5].$date2AsString[6];
                    $date2Month = intval($date2Month);
                    $date2Year = $date2AsString[0].$date2AsString[1].$date2AsString[2].$date2AsString[3];
                    $date2Year = intval($date2Year);
//                echo "DATE 1 --- YEAR = ".$date2Year." MONTH = ".$date2Month." DAY = ".$date2Day."<br>";


                if($date1Year > $date2Year){
                        $this->swap($dates[$i], $dates[$j]);
                        $this->swap($ids[$i], $ids[$j]);
                        $this->swap($homeTeams[$i], $homeTeams[$j]);
                        $this->swap($awayTeams[$i], $awayTeams[$j]);
                    }
                    else if($date1Month > $date2Month and $date1Year == $date2Year){
                        $this->swap($dates[$i], $dates[$j]);
                        $this->swap($ids[$i], $ids[$j]);
                        $this->swap($homeTeams[$i], $homeTeams[$j]);
                        $this->swap($awayTeams[$i], $awayTeams[$j]);
                    }
                    else if($date1Day > $date2Day and $date1Month == $date2Month){
                        $this->swap($dates[$i], $dates[$j]);
                        $this->swap($ids[$i], $ids[$j]);
                        $this->swap($homeTeams[$i], $homeTeams[$j]);
                        $this->swap($awayTeams[$i], $awayTeams[$j]);

                    }

            }


    }

    #[Route('/', name: 'app_competition_match_index', methods: ['GET'])]
    public function index(CompetitionMatchRepository $competitionMatchRepository, Request $request, EntityManagerInterface $entityManager): Response
    {


        $repository = $entityManager->getRepository(Team::class);
        $dbAll = $repository->findAll();

        $ids = array();

        $teams = array();
        foreach ($dbAll as $dbInfo) {
            array_push( $teams,$dbInfo->getName());
        }




        $dates = $this->createDates($teams);
        $homeTeams = $this->homeTeams($teams); // SHOULD I DO A SOMETHING LIKE "homeTeam"->"awayTeam" so I don't iterate 2 times or its ok?
        $awayTeams = $this->awayTeams($teams);

//        var_dump($dates[0]->form);

        // get count of competitionMatch DB row

        $competitionMatchDb = $entityManager->getRepository(CompetitionMatch::class);
        $dbAll = $competitionMatchDb->findAll();

        foreach ($dbAll as $dbInfo) {
            array_push( $ids,$dbInfo->getId());
        }


        $totalEntries = $competitionMatchDb->createQueryBuilder('a')
            ->select('count(a.id)')
            ->getQuery()
            ->getSingleScalarResult();

        if($totalEntries == 0) {
            $this->generateMatchesAndInsertInDb($homeTeams, $awayTeams, $dates, $competitionMatchRepository, $entityManager);

//            $this->sortByDate($dates, $ids, $homeTeams, $awayTeams);
            return $this->redirect($request->getUri());

        }
        else{
            echo($ids[0]."<br>");


//        $this->generateMatchesAndInsertInDb($homeTeams, $awayTeams, $dates, $competitionMatchRepository);

//        echo "DAY = ".$this->sortByDate($dates, $ids, $homeTeams, $awayTeams);

            $this->sortByDate($dates, $ids, $homeTeams, $awayTeams);
        }


        return $this->render('competition_match/index.html.twig', [
            'competition_matches' => $competitionMatchRepository->findAll(),
            "ids"=>$ids,
            "teams"=>$teams,
            "dates"=>$dates,
            "homeTeams"=>$homeTeams,
            "awayTeams"=>$awayTeams
        ]);



    }


    public function findFirstNotPlayed($played): int{
        for($i = 0; $i < count($played) - 1; $i = $i + 1)
            if($played[$i] == 0)
                return $i;

        return -1;
    }

    #[Route('/matchdays', name: 'app_competition_match_matchdays', methods: ['GET', 'POST'])]
    public function new(Request $request, CompetitionMatchRepository $competitionMatchRepository, EntityManagerInterface $entityManager): Response
    {
        $repository = $entityManager->getRepository(Team::class);
        $dbAll = $repository->findAll();

        $ids = array();

        $teams = array();
        foreach ($dbAll as $dbInfo) {
            array_push( $teams,$dbInfo->getName());
        }


        $dates = $this->createDates($teams);
        $homeTeams = $this->homeTeams($teams); // SHOULD I DO A SOMETHING LIKE "homeTeam"->"awayTeam" so I don't iterate 2 times or its ok?
        $awayTeams = $this->awayTeams($teams);

        $competitionMatchDb = $entityManager->getRepository(CompetitionMatch::class);
        $dbAll = $competitionMatchDb->findAll();
        $played = array();

        foreach ($dbAll as $dbInfo) {
            array_push( $ids,$dbInfo->getId());
            array_push($played, $dbInfo->getPlayed());
        }

        $totalEntries = $competitionMatchDb->createQueryBuilder('a')
            ->select('count(a.id)')
            ->getQuery()
            ->getSingleScalarResult();


        $homeTeamsGoals = array();
        $awayTeamsGoals = array();

        var_dump($played);
//        die();

        if($totalEntries == 0) {
            $this->generateMatchesAndInsertInDb($homeTeams, $awayTeams, $dates, $competitionMatchRepository, $entityManager);

            $this->sortByDate($dates, $ids, $homeTeams, $awayTeams);
            return $this->redirect($request->getUri());

        }
        else{
//            for($i = 0; $i < count($homeTeams); $i = $i + 1) {
//                array_push($homeTeamsGoals, random_int(0, 5));
//                array_push($awayTeamsGoals, random_int(0, 5));
//            }

            var_dump("ARRAY SUM =".array_sum($played). " PLAYED CNT = ".count($played));
//            die();
//            die();
            $first_unplayed_match = $this->findFirstNotPlayed($played);

            if($first_unplayed_match != -1){
                for($i = $first_unplayed_match; $i < $first_unplayed_match + 7 and $i < count($played);$i = $i + 1){
                $played[$i] = 1;
                $match_id = $ids[$i];
                echo $i."<br>";
                $homeTeamsGoals[$i] = random_int(0,5);
                $awayTeamsGoals[$i] = random_int(0, 5);

                //update played column so we get another values when we reload page
                    $update = $entityManager->getRepository(CompetitionMatch::class)->find($match_id);
                    $update->setPlayed(1);
                    $entityManager->flush();


                // also update goals scored/conceded of teams
                    //update home teams goals
                    $team_db_updates = $entityManager->getRepository(Team::class)->findBy(['name'=>$homeTeams[$i]]);
                    echo("HOME TEAMS = ".$homeTeams[$i]."<br>");
//                    var_dump($team_db_updates[0]);
//                    die();

                    if($team_db_updates[0]->getGoalsScored() == null)
                        $homeTeamGoalsScoredVal = 0;
                    else
                        $homeTeamGoalsScoredVal = $team_db_updates[0]->getGoalsScored();

                    if($team_db_updates[0]->getGoalsConceded() == null)
                        $homeTeamGoalsConcededVal = 0;
                    else
                        $homeTeamGoalsConcededVal = $team_db_updates[0]->getGoalsConceded();

                    $homeTeamId = $team_db_updates[0]->getId();
                    $team_db_updates[0]->setGoalsScored($homeTeamGoalsScoredVal + $homeTeamsGoals[$i]);
                    $team_db_updates[0]->setGoalsConceded($homeTeamGoalsConcededVal + $awayTeamsGoals[$i]);
                    $entityManager->flush();

                    $team_db_updates = $entityManager->getRepository(Team::class)->findBy(['name'=>$awayTeams[$i]]);
                    $awayTeamId = $team_db_updates[0]->getId();
                    $team_db_updates[0]->setGoalsScored($homeTeamGoalsConcededVal+ $awayTeamsGoals[$i]);
                    $team_db_updates[0]->setGoalsConceded($homeTeamGoalsScoredVal + $homeTeamsGoals[$i]);
                    $entityManager->flush();

                    //TODO: modify values in aux table by team
                    //find by matchid and team id
                    //home team
//                    die();
                    $auxTableHomeTeam = $entityManager->getRepository(TeamCompetitionMatch::class)->findOneBy(["matches_id"=>$match_id, "teams_id"=>$homeTeamId]);
                    $auxTableAwayTeam = $entityManager->getRepository(TeamCompetitionMatch::class)->findOneBy(["matches_id"=>$match_id, "teams_id"=>$awayTeamId]);

                    if($homeTeamsGoals > $awayTeamsGoals){
                        $auxTableHomeTeam->setPoints(3);
                        $auxTableAwayTeam->setPoints(0);
                    }
                    else if($homeTeamsGoals == $awayTeamsGoals){
                        $auxTableHomeTeam->setPoints(1);
                        $auxTableAwayTeam->setPoints(1);
                    }
                    else{
                        $auxTableHomeTeam->setPoints(0);
                        $auxTableAwayTeam->setPoints(3);
                    }

                }
                echo "SUM = ".array_sum($played)."<br>";
//                $first_unplayed_match = $this->findFirstNotPlayed($played);
            }

//die();
            echo($ids[0]."<br>");


//        $this->generateMatchesAndInsertInDb($homeTeams, $awayTeams, $dates, $competitionMatchRepository);

//        echo "DAY = ".$this->sortByDate($dates, $ids, $homeTeams, $awayTeams);

            $this->sortByDate($dates, $ids, $homeTeams, $awayTeams);
        }



        return $this->render('competition_match/matchdays.html.twig', [
            'competition_matches' => $competitionMatchRepository->findAll(),
            "ids"=>$ids,
            "teams"=>$teams,
            "played"=>$played,
            "homeTeams"=>$homeTeams,
            "awayTeams"=>$awayTeams,
            "homeTeamsGoals"=>$homeTeamsGoals,
            "awayTeamsGoals"=>$awayTeamsGoals,
            "first_unplayed_match"=>$first_unplayed_match
        ]);

    }

    #[Route('/{id}', name: 'app_competition_match_show', methods: ['GET'])]
    public function show(CompetitionMatch $competitionMatch): Response
    {
        return $this->render('competition_match/show.html.twig', [
            'competition_match' => $competitionMatch,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_competition_match_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, CompetitionMatch $competitionMatch, CompetitionMatchRepository $competitionMatchRepository): Response
    {
        $form = $this->createForm(CompetitionMatchTypeEdit::class, $competitionMatch);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $competitionMatchRepository->save($competitionMatch, true);

            return $this->redirectToRoute('app_competition_match_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('competition_match/edit.html.twig', [
            'competition_match' => $competitionMatch,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_competition_match_delete', methods: ['POST'])]
    public function delete(Request $request, CompetitionMatch $competitionMatch, CompetitionMatchRepository $competitionMatchRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$competitionMatch->getId(), $request->request->get('_token'))) {
            $competitionMatchRepository->remove($competitionMatch, true);
        }

        return $this->redirectToRoute('app_competition_match_index', [], Response::HTTP_SEE_OTHER);
    }




//    #[Route('/matchdays', name: 'app_competition_match_matchdays', methods: ['POST'])]
//
//    public function matchDay(CompetitionMatchRepository $competitionMatchRepository, Request $request, EntityManagerInterface $entityManager): Response{
//
//        return $this->render('competition_match/matchdays.html.twig');
//    }



}
