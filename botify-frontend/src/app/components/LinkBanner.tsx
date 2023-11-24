import Image from 'next/image'

interface Props {
    links: string[][]
} 

const LinkBanner:React.FC<Props> = ({links}) => {
  return (
      <div className='grid grid-cols-7'>
          {links.map(l => {
                return (
                    <div className='flex flex-col'>
                        <div className='h-[100%]'>
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
                        <p className='text-center'>{l[0]}</p>
                    </div>
              )
          })}
      </div>
  )
}

export default LinkBanner;