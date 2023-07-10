<?php

namespace App\Entity;

use App\Repository\CompetitionMatchRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CompetitionMatchRepository::class)]
class CompetitionMatch
{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $start_date = null;

    #[ORM\OneToOne(inversedBy: 'updateField', cascade: ['persist', 'remove'])]
    private ?Team $winner_id = null;


    #[ORM\OneToMany(targetEntity: "TeamCompetitionMatch", mappedBy: "id")]
    private ?Collection $teamCompetitionMatch = null;


    public function __construct()
    {
        $this->teamCompetitionMatch = new ArrayCollection();

    }


    public function getId(): ?int
    {
        return $this->id;
    }


    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->start_date;
    }

    public function setStartDate(\DateTimeInterface $start_date): static
    {
        $this->start_date = $start_date;

        return $this;
    }

    public function getWinnerId(): ?int
    {
        return $this->winner_id;
    }

    public function setWinnerId(?int $winner_id): static
    {
        $this->winner_id = $winner_id;

        return $this;
    }

    /**
     * @return Collection<int, Team>
     */
    public function getTeamCompetitionMatch(): Collection
    {
        return $this->teamCompetitionMatch;
    }

//    public function addTeamCompetitionMatch(Team $teamCompetio): static
//    {
//        if (!$this->teams->contains($team)) {
//            $this->teams->add($team);
//            $team->addMatch($this);
//        }
//
//        return $this;
//    }

    public function removeTeamCompetitionMatch(Team $teamCompetitionMatch): static
    {
        if ($this->teamCompetitionMatch->removeElement($this->teamCompetitionMatch)) {
            $teamCompetitionMatch->removeMatch($this);
        }

        return $this;
    }



}
