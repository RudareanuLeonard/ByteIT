<?php

namespace App\Repository;

use App\Entity\TeamCompetitionMatch;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<TeamCompetitionMatch>
 *
 * @method TeamCompetitionMatch|null find($id, $lockMode = null, $lockVersion = null)
 * @method TeamCompetitionMatch|null findOneBy(array $criteria, array $orderBy = null)
 * @method TeamCompetitionMatch[]    findAll()
 * @method TeamCompetitionMatch[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TeamCompetitionMatchRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TeamCompetitionMatch::class);
    }

    public function save(TeamCompetitionMatch $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(TeamCompetitionMatch $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return TeamCompetitionMatch[] Returns an array of TeamCompetitionMatch objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('t.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?TeamCompetitionMatch
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
