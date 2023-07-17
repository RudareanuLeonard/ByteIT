<?php

namespace App\Entity;

use App\Repository\TeamRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Mapping\ClassMetadata;
#[ORM\Entity(repositoryClass: TeamRepository::class)]
class Team
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    public ?string $name = null;

    #[ORM\Column]
    private ?int $players = null;

    #[ORM\OneToOne(mappedBy: 'winner_id', cascade: ['persist', 'remove'])]
    private ?CompetitionMatch $updateField = null;




    #[ORM\OneToMany(targetEntity: "TeamCompetitionMatch", mappedBy: "id")]
    private ?Collection $teamCompetitionMatch = null;

    #[ORM\Column]
    private ?int $goals_scored = null;

    #[ORM\Column]
    private ?int $goals_conceded = null;



    public function __construct()
    {
        $this->update_field_team_id = new ArrayCollection();
        $this->matches = new ArrayCollection();
        $this->teamCompetitionMatch = new ArrayCollection();
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

    public  function setId(int $id){
        $this->id = $id;

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



    public function __toString(): string
    {
        return $this->getName();
    }


    public static function loadValidatorMetadata(ClassMetadata $metadata): void
    {
        $metadata->addPropertyConstraint('name',
            new Assert\Length(
                [
                    'min'=>4,
                    'max'=>20,
                    'minMessage' => 'Your team name must be at least {{ limit }} characters long',
                    'maxMessage' => 'Your team name cannot be longer than {{ limit }} characters'
                ]

            )
        );


        $metadata->addPropertyConstraint('players', new Assert\Positive());
    }
    public function setGoalsScored(int $goals_scored): static
    {
        $this->goals_scored = $goals_scored;

        return $this;
    }

    public function getGoalsScored(){
        return $this->goals_scored;
    }


    public function setGoalsConceded(int $goals_conceded): static
    {
        $this->goals_conceded = $goals_conceded;

        return $this;
    }

    public function getGoalsConceded(){
        return $this->goals_conceded;
    }

    /**
     * @return Collection<int, TeamCompetitionMatch>
     */
    public function getTeamCompetitionMatch(): Collection
    {
        return $this->teamCompetitionMatch;
    }

    public function addTeamCompetitionMatch(TeamCompetitionMatch $teamCompetitionMatch): static
    {
        if (!$this->teamCompetitionMatch->contains($teamCompetitionMatch)) {
            $this->teamCompetitionMatch->add($teamCompetitionMatch);
            $teamCompetitionMatch->setId($this);
        }

        return $this;
    }

    public function removeTeamCompetitionMatch(TeamCompetitionMatch $teamCompetitionMatch): static
    {
        if ($this->teamCompetitionMatch->removeElement($teamCompetitionMatch)) {
            // set the owning side to null (unless already changed)
            if ($teamCompetitionMatch->getId() === $this) {
                $teamCompetitionMatch->setId(null);
            }
        }

        return $this;
    }



}
