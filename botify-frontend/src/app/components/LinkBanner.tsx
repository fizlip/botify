import Image from 'next/image'
import Link from 'next/link'

interface Props {
    links: string[][]
} 

const LinkBanner:React.FC<Props> = ({links}) => {
  return (
      <div className='grid grid-cols-7'>
          {links.map(l => {
                return (
                    <Link href="/bots" className='group flex flex-col hover:border border-neutral-700 rounded-md p-2 cursor:pointer'>
                        <div className='h-[100%] group:hover:h-[200%]'>
                        <Image 
                            src={l[1]}
                            width={100}
                            height={100}
                            alt="pic"
                            className="rounded-full m-auto"
                            objectFit='contain'
                            layout="fixed"
                        />
                        </div>
                        <p className='text-center group-hover:underline'>{l[0]}</p>
                    </Link>
              )
          })}
      </div>
  )
}

export default LinkBanner;