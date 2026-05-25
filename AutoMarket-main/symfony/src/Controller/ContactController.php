<?php

namespace App\Controller;

use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ContactController extends AbstractController
{
    #[Route('/contact', name: 'contact', methods: ['GET', 'POST'])]
    public function index(Request $request, EntityManagerInterface $em): Response
    {
        if ($request->isMethod('POST')) {
            $contact = new Contact();
            $contact->setName($request->request->get('name', ''));
            $contact->setPhone($request->request->get('phone', ''));
            $contact->setEmail($request->request->get('email', ''));
            $contact->setCar($request->request->get('car'));
            $contact->setMessage($request->request->get('message'));

            $em->persist($contact);
            $em->flush();

            $this->addFlash('success', 'Your message has been sent!');
            return $this->redirectToRoute('contact');
        }

        return $this->render('contact/index.html.twig');
    }
}
