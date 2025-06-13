// components/PageHeader.jsx
const PageHeader = ({ subTitle, title, breadcrumb }) => {
    return (
      <div className="bg-[#6f7875] text-white py-20 text-center relative">
        <h4 className="text-[#d7d46d] uppercase font-semibold tracking-wider mb-2">
          {subTitle}
        </h4>
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="text-sm mt-2 opacity-80">
          <span className="mr-2">🏠</span> Trang chủ &nbsp; &gt; &nbsp; {breadcrumb}
        </div>
  
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0 top-50 overflow-hidden leading-none">
          <svg
            className="w-full h-[100px]"
            viewBox="0 0 1440 100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 
                 C 120,60 240,0 360,30 
                 C 480,60 600,0 720,30 
                 C 840,60 960,0 1080,30 
                 C 1200,60 1320,0 1440,30 
                 L1440,100 L0,100 Z"
              fill="#fdfbf7"
            />
          </svg>
        </div>
      </div>
    );
  };
  
  export default PageHeader;
  