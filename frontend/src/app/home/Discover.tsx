import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Discover:React.FC = () => {
  return (
    <div className='my-[5vw] h-[80vh]'>
      <video autoPlay loop className="object-cover w-full h-full -z-10 absolute blur-xl opacity-40">
        <source src='/videos/footer.mp4'/>
      </video>
      <div className='h-[80vh] flex flex-col justify-center items-center'>
        <div className='flex gap-2'>
          <img src='/icons/turquioaz.svg' alt='' className='w-20 h-20'/>
          <h1 className='landing-text font-semibold text-5xl tracking-tighter my-auto'>Turquioaz</h1>
        </div>
        <h1 className='text-6xl tracking-tighter font-medium text-center'>Open your doors to the <br /> world of exotic cars.</h1>
        <button className="relative inline-flex mt-7 overflow-hidden rounded p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded bg-slate-950 px-12 py-3 text-sm font-medium text-white backdrop-blur-3xl">
            Explore
          </span>
        </button>
      </div>
    </div>
  )
}

export default Discover
