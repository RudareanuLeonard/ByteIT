<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230708095113 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE team DROP points');
        $this->addSql('ALTER TABLE team_competition_match DROP FOREIGN KEY FK_C532798F1BCF97F9');
        $this->addSql('ALTER TABLE team_competition_match DROP FOREIGN KEY FK_C532798F296CD8AE');
        $this->addSql('DROP INDEX IDX_C532798F1BCF97F9 ON team_competition_match');
        $this->addSql('DROP INDEX IDX_C532798F296CD8AE ON team_competition_match');
        $this->addSql('ALTER TABLE team_competition_match ADD id INT AUTO_INCREMENT NOT NULL, ADD matches_id INT DEFAULT NULL, ADD teams_id INT DEFAULT NULL, ADD points INT NOT NULL, DROP team_id, DROP competition_match_id, DROP PRIMARY KEY, ADD PRIMARY KEY (id)');
        $this->addSql('ALTER TABLE team_competition_match ADD CONSTRAINT FK_C532798F4B30DD19 FOREIGN KEY (matches_id) REFERENCES competition_match (id)');
        $this->addSql('ALTER TABLE team_competition_match ADD CONSTRAINT FK_C532798FD6365F12 FOREIGN KEY (teams_id) REFERENCES team (id)');
        $this->addSql('CREATE INDEX IDX_C532798F4B30DD19 ON team_competition_match (matches_id)');
        $this->addSql('CREATE INDEX IDX_C532798FD6365F12 ON team_competition_match (teams_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE team ADD points INT NOT NULL');
        $this->addSql('ALTER TABLE team_competition_match MODIFY id INT NOT NULL');
        $this->addSql('ALTER TABLE team_competition_match DROP FOREIGN KEY FK_C532798F4B30DD19');
        $this->addSql('ALTER TABLE team_competition_match DROP FOREIGN KEY FK_C532798FD6365F12');
        $this->addSql('DROP INDEX IDX_C532798F4B30DD19 ON team_competition_match');
        $this->addSql('DROP INDEX IDX_C532798FD6365F12 ON team_competition_match');
        $this->addSql('DROP INDEX `PRIMARY` ON team_competition_match');
        $this->addSql('ALTER TABLE team_competition_match ADD competition_match_id INT NOT NULL, DROP id, DROP matches_id, DROP teams_id, CHANGE points team_id INT NOT NULL');
        $this->addSql('ALTER TABLE team_competition_match ADD CONSTRAINT FK_C532798F1BCF97F9 FOREIGN KEY (competition_match_id) REFERENCES competition_match (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE team_competition_match ADD CONSTRAINT FK_C532798F296CD8AE FOREIGN KEY (team_id) REFERENCES team (id) ON DELETE CASCADE');
        $this->addSql('CREATE INDEX IDX_C532798F1BCF97F9 ON team_competition_match (competition_match_id)');
        $this->addSql('CREATE INDEX IDX_C532798F296CD8AE ON team_competition_match (team_id)');
        $this->addSql('ALTER TABLE team_competition_match ADD PRIMARY KEY (team_id, competition_match_id)');
    }
}
