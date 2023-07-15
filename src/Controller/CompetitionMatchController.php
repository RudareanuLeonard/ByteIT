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

    public function generateMatchesAndInsertInDb($homeTeams, $awayTeams, $dates, CompetitionMatchRepository $competitionMatchRepository): Response{

        for($i = 0; $i < count($homeTeams); $i = $i + 1){
            $homeTeam = $homeTeams[$i];
            $awayTeam = $awayTeams[$i];
            $date = $dates[$i];

            $competitionMatch = new CompetitionMatch();
            $competitionMatch->setStartDate($date);

            $competitionMatchRepository->save($competitionMatch, true);


        }
        return new Response('Matches generated and inserted successfully!', Response::HTTP_OK);

    }


    public function swap(&$a, &$b){
        $aux = $a;
        $a = $b;
        $b = $aux;
    }

    public function fasd(&$f){
        $f = 2;
//        echo $f;
    }
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

        if($request->isMethod('POST') && $request->request->has('schedule-matches')){
            return $this->redirect('http://stackoverflow.com');
        }

        $var = 10;
        $this->fasd($var);
        echo $var;

        echo "<br><br>";


        $repository = $entityManager->getRepository(Team::class);
        $dbAll = $repository->findAll();

        $ids = array();

        $teams = array();
        foreach ($dbAll as $dbInfo) {
            array_push( $teams,$dbInfo->getName());
        }


//        echo print_r($teams);

//        echo $teams[0];


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
            $this->generateMatchesAndInsertInDb($homeTeams, $awayTeams, $dates, $competitionMatchRepository);

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

    #[Route('/new', name: 'app_competition_match_new', methods: ['GET', 'POST'])]
    public function new(Request $request, CompetitionMatchRepository $competitionMatchRepository, EntityManagerInterface $entityManager): Response
    {
        $competitionMatch = new CompetitionMatch();
        $form = $this->createForm(CompetitionMatchType::class, $competitionMatch);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
//            print_r($request->request->all());

            $params = $request->request->all();

//            print("<pre>".print_r($params,true)."</pre>");

//
//            echo"<br>";
//            echo"<br>";
//            echo"<br>";
//            print_r(var_dump($params["competition_match"]["team1"]));
//            die();


            $competitionMatchRepository->save($competitionMatch, true);
//            get id and then create 2 entries in additional table
            $match_id = $competitionMatch->getId();
            $team1 = $params["competition_match"]["team1"];
            echo "TEAM 1 = ".$team1;
            $team2 = $params["competition_match"]["team2"];

            $team1Obj = $entityManager->find(Team::class, $team1);
            $team2Obj = $entityManager->find(Team::class, $team2);

            //daca exista => insert

            if($team1Obj and $team2Obj){ //if both obj exists, then we can insert

                $teamCompetitionMatch1 = new TeamCompetitionMatch();
                $this->addFlash('success','ID = '.$match_id);

//            print("<pre>".print_r($teamCompetitionMatch->setTeams($team1Obj),true)."</pre>");
//            die();
//            $teamCompetitionMatch->setMatchId($match_id);
                $teamCompetitionMatch1->setMatches($competitionMatch);
                $teamCompetitionMatch1->setTeams($team1Obj);
                $teamCompetitionMatch1->setPoints(10);

                $teamCompetitionMatch2 = new TeamCompetitionMatch();
                $teamCompetitionMatch2->setMatches($competitionMatch);
                $teamCompetitionMatch2->setTeams($team2Obj);
                $teamCompetitionMatch2->setPoints(10);

                $entityManager->persist($teamCompetitionMatch1);
                $entityManager->persist($teamCompetitionMatch2);
                $entityManager->flush();

            }


            return $this->redirectToRoute('app_competition_match_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('competition_match/new.html.twig', [
            'competition_match' => $competitionMatch,
            'form' => $form,
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

//    #[Route('/', name: 'app_competition_match_schedule_matches', methods: ['GET, POST'])]
//    public function scheduleMatches(CompetitionMatchRepository $competitionMatchRepository, EntityManagerInterface $entityManager): Response
//    {
//        $repository = $entityManager->getRepository(Team::class);
//        $products = $repository->findAll();
////        print_r($products);
//
//        $teams = array();
//        foreach ($products as $product) {
//            array_push( $teams,$product->getName());
//        }
//
////        echo print_r($teams);
//
//        echo $teams[0];
//
//
//
//    }




}
