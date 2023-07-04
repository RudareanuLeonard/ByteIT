<?php

namespace App\Entity;

use App\Repository\MatchTeamRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MatchTeamRepository::class)]
class MatchTeam
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'updateField', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?CompetitionMatch $match_id = null;

    #[ORM\ManyToMany(targetEntity: Team::class, inversedBy: 'update_field_team_id')]
    private Collection $team_id;

    #[ORM\Column]
    private ?int $points = null;

    public function __construct()
    {
        $this->team_id = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMatchId(): ?CompetitionMatch
    {
        return $this->match_id;
    }

    public function setMatchId(CompetitionMatch $match_id): static
    {
        $this->match_id = $match_id;

        return $this;
    }

    /**
     * @return Collection<int, Team>
     */
    public function getTeamId(): Collection
    {
        return $this->team_id;
    }

    public function addTeamId(Team $teamId): static
    {
        if (!$this->team_id->contains($teamId)) {
            $this->team_id->add($teamId);
        }

        return $this;
    }

    public function removeTeamId(Team $teamId): static
    {
        $this->team_id->removeElement($teamId);

        return $this;
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
}
