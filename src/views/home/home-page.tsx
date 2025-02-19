import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="bg-gray-30">
      <div className="container mx-auto px-4 py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Sistema de Agendamento Inteligente
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Simplifique seu processo de agendamento de serviços com nossa solução moderna e eficiente
            </p>
            <Link href="/service-catalog">
              <button className="btn btn-primary">
                Comece Agora
              </button>
            </Link>
          </div>

          {/* Image Container */}
          <div className="flex-1 w-full flex justify-center items-center">
            <div className="relative w-full max-w-lg">
              <Image
                src="/images/time-management-concept-illustration.png"
                alt="Sistema de Agendamento"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
                priority
                sizes="(max-width: 768px) 80vw, 
                       (max-width: 1200px) 50vw,
                       600px"
                style={{
                  objectFit: 'contain',
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}