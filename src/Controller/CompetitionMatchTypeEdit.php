<?php


namespace App\Controller;

use App\Entity\CompetitionMatch;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use App\Form\CompetitionMatchType;

class CompetitionMatchTypeEdit extends CompetitionMatchType{#for _form_edit

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        parent::buildForm($builder, $options);
        $builder->add('winner_id');
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => CompetitionMatch::class,
        ]);
    }

}
