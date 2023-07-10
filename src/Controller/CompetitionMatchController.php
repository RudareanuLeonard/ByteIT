<?php

namespace App\Controller;

use App\Entity\CompetitionMatch;
use App\Entity\TeamCompetitionMatch;
use App\Form\CompetitionMatchType;
use App\Repository\CompetitionMatchRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/competition/match')]
class CompetitionMatchController extends AbstractController
{


    #[Route('/', name: 'app_competition_match_index', methods: ['GET'])]
    public function index(CompetitionMatchRepository $competitionMatchRepository): Response
    {
        return $this->render('competition_match/index.html.twig', [
            'competition_matches' => $competitionMatchRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_competition_match_new', methods: ['GET', 'POST'])]
    public function new(Request $request, CompetitionMatchRepository $competitionMatchRepository): Response
    {
        $competitionMatch = new CompetitionMatch();
        $form = $this->createForm(CompetitionMatchType::class, $competitionMatch);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $competitionMatchRepository->save($competitionMatch, true);
           // get id and then create 2 entries in additional table
            $match_id = $competitionMatch->getId();
//            $this->addFlash(
//                'notice',
//                'Your changes were saved!'
//            );
//

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
}
