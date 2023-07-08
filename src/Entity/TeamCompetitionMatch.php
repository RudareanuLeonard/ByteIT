<?php

namespace App\Entity;

use App\Repository\TeamRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;


#[ORM\Entity(repositoryClass: TeamCompetitionMatchRepository::class)]
class TeamCompetitionMatch{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: CompetitionMatch::class, inversedBy: 'teams')]
    private Collection $matches;


    #[ORM\ManyToOne(targetEntity: Team::class, inversedBy: 'matches')]
    private Collection $teams;

    #[ORM\Column]
    private ?int $points = null;

    /**
     * @return Collection
     */
    public function getTeams(): Collection
    {
        return $this->teams;
    }



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


    public function getMatches(): Collection
    {
        return $this->matches;
    }

    public function addMatch(CompetitionMatch $match): static
    {
        if (!$this->matches->contains($match)) {
            $this->matches->add($match);
        }

        return $this;
    }

    public function removeMatch(CompetitionMatch $match): static
    {
        $this->matches->removeElement($match);

        return $this;
    }
}