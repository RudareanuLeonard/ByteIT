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

#[Route('/competition/match')]
class CompetitionMatchController extends AbstractController
{


    public function getName(){
        return "nume1";
    }
    #[Route('/', name: 'app_competition_match_index', methods: ['GET'])]
    public function index(CompetitionMatchRepository $competitionMatchRepository, Request $request, EntityManagerInterface $entityManager): Response
    {

        if($request->isMethod('POST') && $request->request->has('schedule-matches')){
            return $this->redirect('http://stackoverflow.com');
        }



        $repository = $entityManager->getRepository(Team::class);
        $products = $repository->findAll();
//        print_r($products);

        $teams = array();
        foreach ($products as $product) {
            array_push( $teams,$product->getName());
        }


//        echo print_r($teams);

//        echo $teams[0];




        return $this->render('competition_match/index.html.twig', [
            'competition_matches' => $competitionMatchRepository->findAll(),
            "teams"=>$teams
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
