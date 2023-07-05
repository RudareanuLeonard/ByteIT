<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230705071438 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE team_competition_match (team_id INT NOT NULL, competition_match_id INT NOT NULL, INDEX IDX_C532798F296CD8AE (team_id), INDEX IDX_C532798F1BCF97F9 (competition_match_id), PRIMARY KEY(team_id, competition_match_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE team_competition_match ADD CONSTRAINT FK_C532798F296CD8AE FOREIGN KEY (team_id) REFERENCES team (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE team_competition_match ADD CONSTRAINT FK_C532798F1BCF97F9 FOREIGN KEY (competition_match_id) REFERENCES competition_match (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE match_team DROP FOREIGN KEY FK_A58F176DC12EE1F6');
        $this->addSql('ALTER TABLE match_team_team DROP FOREIGN KEY FK_CB01ECF296CD8AE');
        $this->addSql('ALTER TABLE match_team_team DROP FOREIGN KEY FK_CB01ECF5ECA87C1');
        $this->addSql('DROP TABLE match_team');
        $this->addSql('DROP TABLE match_team_team');
        $this->addSql('ALTER TABLE team ADD points INT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE match_team (id INT AUTO_INCREMENT NOT NULL, match_id_id INT NOT NULL, points INT NOT NULL, UNIQUE INDEX UNIQ_A58F176DC12EE1F6 (match_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE match_team_team (match_team_id INT NOT NULL, team_id INT NOT NULL, INDEX IDX_CB01ECF296CD8AE (team_id), INDEX IDX_CB01ECF5ECA87C1 (match_team_id), PRIMARY KEY(match_team_id, team_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE match_team ADD CONSTRAINT FK_A58F176DC12EE1F6 FOREIGN KEY (match_id_id) REFERENCES competition_match (id)');
        $this->addSql('ALTER TABLE match_team_team ADD CONSTRAINT FK_CB01ECF296CD8AE FOREIGN KEY (team_id) REFERENCES team (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE match_team_team ADD CONSTRAINT FK_CB01ECF5ECA87C1 FOREIGN KEY (match_team_id) REFERENCES match_team (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE team_competition_match DROP FOREIGN KEY FK_C532798F296CD8AE');
        $this->addSql('ALTER TABLE team_competition_match DROP FOREIGN KEY FK_C532798F1BCF97F9');
        $this->addSql('DROP TABLE team_competition_match');
        $this->addSql('ALTER TABLE team DROP points');
    }
}
