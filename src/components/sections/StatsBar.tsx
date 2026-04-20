import React from 'react'

const StatsBar = () => {
    return (
        <section
            id="statsbar"
            className="relative bg-white py-16 md:py-24 overflow-hidden"
        >
            <div className="max-w-[1280px] mx-auto px-4 md:px-8">

                <div className="bg-[#2563EB] rounded-2xl px-6 py-6 md:px-10 md:py-8 grid grid-cols-2 xl:grid-cols-4 gap-6 md:gap-0">
                    {[
                        { value: '20,000+', label: 'PCNs issued across London every single day' },
                        { value: '2 in 3', label: 'PCN appeals are cancelled when challenged correctly' },
                        { value: '50%', label: 'Discount available if you act within 14 days' },
                        { value: '33+', label: 'London councils covered — one app for all of them' },
                    ].map((stat, i, arr) => (
                        <div key={i} className={`text-center px-6 ${i < arr.length - 1 ? 'xl:border-r xl:border-white/20' : ''}`}>
                            <h3 className="text-white text-[32px] md:text-[40px] font-bold">{stat.value}</h3>
                            <p className="text-white/70 text-[13px] md:text-[13px] leading-[18px] mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default StatsBar