<?php

namespace App\Entity;

use App\Repository\CompetitionMatchRepository;
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

    #[ORM\OneToOne(mappedBy: 'match_id', cascade: ['persist', 'remove'])]
    private ?MatchTeam $updateField = null;

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

    public function getWinnerId(): ?Team
    {
        return $this->winner_id;
    }

    public function setWinnerId(?Team $winner_id): static
    {
        $this->winner_id = $winner_id;

        return $this;
    }

    public function getUpdateField(): ?MatchTeam
    {
        return $this->updateField;
    }

    public function setUpdateField(MatchTeam $updateField): static
    {
        // set the owning side of the relation if necessary
        if ($updateField->getMatchId() !== $this) {
            $updateField->setMatchId($this);
        }

        $this->updateField = $updateField;

        return $this;
    }
}
