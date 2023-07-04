<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230704110452 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE match_team_team (match_team_id INT NOT NULL, team_id INT NOT NULL, INDEX IDX_CB01ECF5ECA87C1 (match_team_id), INDEX IDX_CB01ECF296CD8AE (team_id), PRIMARY KEY(match_team_id, team_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE match_team_team ADD CONSTRAINT FK_CB01ECF5ECA87C1 FOREIGN KEY (match_team_id) REFERENCES match_team (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE match_team_team ADD CONSTRAINT FK_CB01ECF296CD8AE FOREIGN KEY (team_id) REFERENCES team (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE sport_match');
        $this->addSql('ALTER TABLE competition_match DROP INDEX IDX_89ECF7D3FC53D4E9, ADD UNIQUE INDEX UNIQ_89ECF7D3FC53D4E9 (winner_id_id)');
        $this->addSql('ALTER TABLE competition_match ADD CONSTRAINT FK_89ECF7D3FC53D4E9 FOREIGN KEY (winner_id_id) REFERENCES team (id)');
        $this->addSql('ALTER TABLE match_team ADD match_id_id INT NOT NULL, ADD points INT NOT NULL, DROP match_id, DROP team_id, DROP points_number');
        $this->addSql('ALTER TABLE match_team ADD CONSTRAINT FK_A58F176DC12EE1F6 FOREIGN KEY (match_id_id) REFERENCES competition_match (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_A58F176DC12EE1F6 ON match_team (match_id_id)');
        $this->addSql('ALTER TABLE team CHANGE people_number players INT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE sport_match (id INT AUTO_INCREMENT NOT NULL, start_date DATE NOT NULL, winner_id INT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE match_team_team DROP FOREIGN KEY FK_CB01ECF5ECA87C1');
        $this->addSql('ALTER TABLE match_team_team DROP FOREIGN KEY FK_CB01ECF296CD8AE');
        $this->addSql('DROP TABLE match_team_team');
        $this->addSql('ALTER TABLE competition_match DROP INDEX UNIQ_89ECF7D3FC53D4E9, ADD INDEX IDX_89ECF7D3FC53D4E9 (winner_id_id)');
        $this->addSql('ALTER TABLE competition_match DROP FOREIGN KEY FK_89ECF7D3FC53D4E9');
        $this->addSql('ALTER TABLE match_team DROP FOREIGN KEY FK_A58F176DC12EE1F6');
        $this->addSql('DROP INDEX UNIQ_A58F176DC12EE1F6 ON match_team');
        $this->addSql('ALTER TABLE match_team ADD match_id INT NOT NULL, ADD team_id INT NOT NULL, ADD points_number INT NOT NULL, DROP match_id_id, DROP points');
        $this->addSql('ALTER TABLE team CHANGE players people_number INT NOT NULL');
    }
}
