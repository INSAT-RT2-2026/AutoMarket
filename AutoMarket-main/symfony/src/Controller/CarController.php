<?php

namespace App\Controller;

use App\Repository\CarRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/cars')]
class CarController extends AbstractController
{
    #[Route('/', name: 'car_list')]
    public function index(CarRepository $carRepository): Response
    {
        $cars = $carRepository->findAllAvailable();
        return $this->render('car/index.html.twig', ['cars' => $cars]);
    }

    #[Route('/{id}', name: 'car_show', requirements: ['id' => '\d+'])]
    public function show(int $id, CarRepository $carRepository): Response
    {
        $car = $carRepository->find($id);
        if (!$car) {
            throw $this->createNotFoundException('Car not found');
        }
        return $this->render('car/show.html.twig', ['car' => $car]);
    }
}
