<?php

namespace App\Entity;

use App\Repository\TeamRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TeamRepository::class)]
class Team
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?int $players = null;

    #[ORM\OneToOne(mappedBy: 'winner_id', cascade: ['persist', 'remove'])]
    private ?CompetitionMatch $updateField = null;

    #[ORM\ManyToMany(targetEntity: CompetitionMatch::class, inversedBy: 'teams')]
    private Collection $matches;

    #[ORM\Column]
    private ?int $points = null;


    public function __construct()
    {
        $this->update_field_team_id = new ArrayCollection();
        $this->matches = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getPlayers(): ?int
    {
        return $this->players;
    }

    public function setPlayers(int $players): static
    {
        $this->players = $players;

        return $this;
    }

    public function getUpdateField(): ?CompetitionMatch
    {
        return $this->updateField;
    }

    public function setUpdateField(?CompetitionMatch $updateField): static
    {
        // unset the owning side of the relation if necessary
        if ($updateField === null && $this->updateField !== null) {
            $this->updateField->setWinnerId(null);
        }

        // set the owning side of the relation if necessary
        if ($updateField !== null && $updateField->getWinnerId() !== $this) {
            $updateField->setWinnerId($this);
        }

        $this->updateField = $updateField;

        return $this;
    }

//    /**
//     * @return Collection<int, MatchTeam>
//     */
    public function getUpdateFieldTeamId(): Collection
    {
        return $this->update_field_team_id;
    }

    /**
     * @return Collection<int, CompetitionMatch>
     */
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

    public function getPoints(): ?int
    {
        return $this->points;
    }

    public function setPoints(int $points): static
    {
        $this->points = $points;

        return $this;
    }

    public function __toString(): string
    {
        return $this->getName();
    }


}
