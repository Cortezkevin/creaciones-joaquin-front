import { Button } from '@nextui-org/button'
import React from 'react'

export const Footer = () => {
  return (
    <footer className='w-full border border-slate-300'>
      <div className='flex h-full flex-col gap-4 max-w-[1000px] min-w-[500px] m-auto md:py-[50px] '>
        <div className='flex sm:flex-col md:flex-row justify-between text-xs'>
          <div className='flex flex-col gap-3'>
            <div className='font-semibold'>Empresa</div>
            <ul className='flex flex-col gap-2'>
              <li>Acerca de la empresa</li>
              <li>Iniciativas medio ambiente y sociales</li>
              <li>Nota de Prensa</li>
              <li>Nuestros Locales</li>
              <li>Trabaja con Nosotros</li>
              <li>Libro de Reclamaciones</li>
            </ul>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='font-semibold'>Recursos en Linea</div>
            <ul className='flex flex-col gap-2'>
              <li>Acerca de la empresa</li>
              <li>Nota de Prensa</li>
              <li>Nuestros Locales</li>
              <li>Trabaja con Nosotros</li>
              <li>Libro de Reclamaciones</li>
            </ul>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='font-semibold'>Proyectos Inmobiliarios</div>
            <ul className='flex flex-col gap-2'>
              <li>Acerca de la empresa</li>
              <li>Iniciativas medio ambiente y sociales</li>
              <li>Nota de Prensa</li>
              <li>Libro de Reclamaciones</li>
            </ul>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <div>
            <small className='text-xs'>© 2024 Muebleria Joaquin</small>
          </div>
          <div className='flex flex-col gap-3'>
            <small className='text-xs'>Siguenos en:</small>
            <div className='flex'>
              <Button size='sm' variant='light' className='text-2xl rounded-full hover:text-blue-600'><i className="fa-brands fa-facebook"></i></Button>
              <Button size='sm' variant='light' className='text-2xl rounded-full hover:text-red-600'><i className="fa-brands fa-square-instagram"></i></Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
