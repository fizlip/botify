import Link from "next/link"
import Image from 'next/image'
import { TfiMedallAlt } from "react-icons/tfi"

interface Props {
  name:string,
  price: number,
  thumbnail: string,
}

const BotCard: React.FC<Props> = ({name, price, thumbnail}) => {
  return (
    <Link href="/bot">
      <div className='border p-2 border-neutral-900 rounded hover:border-teal-700 cursor-pointer'>
        <Image 
            src={thumbnail}
            alt="pic"
            className='rounded'
            width={600}
            height={600}
        />
        <p className='text-xl'>{name}</p>
        <p className='font-mono text-xl font-bold pt-5 flex'>{price} LINK/request</p>
        <p className='font-mono'>10 requests FREE</p>
        <p className='pt-5 text-teal-500 font-bold'>352 requests made</p>
        <p className='font-mono flex'>Owner: 0x0a99...4098 <TfiMedallAlt color="red"/></p>
      </div>
    </Link>
  )
}

export default BotCard;