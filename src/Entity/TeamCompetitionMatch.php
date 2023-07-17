<?php

namespace App\Entity;

use App\Repository\TeamCompetitionMatchRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;


#[ORM\Entity(repositoryClass: TeamCompetitionMatchRepository::class)]
class TeamCompetitionMatch{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: CompetitionMatch::class, inversedBy: 'teams')]
    private CompetitionMatch $matches;


    #[ORM\ManyToOne(targetEntity: Team::class, inversedBy: 'matches')]
    private Team $teams;

    #[ORM\Column]
    private ?int $points = null;

    /**
     * @return Collection
     */

    public function __construct()
    {
//        $this->update_field_team_id = new ArrayCollection();

    }



    public function getTeams(): Team
    {
        return $this->teams;
    }


//    public function setMatchId($team_id){
//        $this->matches = $team_id;
//    }


//    public function setTeamId($teamId){
//        $this->teams["id"] = $teamId;
//    }

    public function getId(): ?int
    {
        return $this->id;
    }
    public function getPoints(): ?int
    {
        return $this->points;
    }

    public function setPoints(int $points): static
    {
        $this->points = $points;

        return $this;
    }


    public function setMatches(CompetitionMatch $matches){
        $this->matches = $matches;

        return $this;
    }


    public function setTeams(Team $teams){
        $this->teams = $teams;

        return $this;
    }


//    public function setTeamsId(int $teamsId){
//        $this->teams_id = $teamsId;
//
//        return $this;
//    }
    public function getMatches(): CompetitionMatch
    {
        return $this->matches;
    }





}