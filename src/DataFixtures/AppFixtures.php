<?php

namespace App\DataFixtures;

use App\Entity\Team;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        for($i = ord('A'); $i < ord('C') + 20; $i = $i + 1){
            $team = new Team();
            $team->setName("Team".chr($i));
            $team->setPlayers(rand(1,5));
            $team->setPoints(rand(0,20));
            $manager->persist($team);
        }

        $manager->flush();
    }
}
