import React from 'react';
import Link from 'next/link';

const Button = ({ 
  href, 
  svgIcon, 
  textOne, 
  textTwo, 
  iconClassName, 
  wrapperBgColor = 'bg-indigo-600',  // Default bg color for .btn-wrapper
  linkTextColor = 'text-white',      // Default text color for .btn-link-wrapper span
  svgWrapperBgColor = 'bg-lime-500', // Default bg color for .btn-svg-wrapper
  type = 'button'                    // Default type for the button
}) => {
  return href ? (
    <Link scroll={false} href={href} legacyBehavior>
      <a className={`btn-wrapper inline-flex items-center justify-center px-8 py-4 gap-4 rounded-full ${wrapperBgColor}`}>
        <div className={`btn-svg-wrapper ${svgWrapperBgColor} w-6 h-6 rounded-full flex items-center justify-center`}>
          {svgIcon && React.cloneElement(svgIcon, { className: iconClassName })}
        </div>
        <div className="btn-link-wrapper">
          <span className={`${linkTextColor} text-4xl`}>{textOne}</span>
          <span className={`${linkTextColor} text-4xl`}>{textTwo}</span>
        </div>
      </a>
    </Link>
  ) : (
    <button 
      type={type} 
      className={`btn-wrapper inline-flex items-center justify-center px-8 py-4 gap-4 rounded-full ${wrapperBgColor}`}
    >
      <div className={`btn-svg-wrapper ${svgWrapperBgColor} w-6 h-6 rounded-full flex items-center justify-center`}>
        {svgIcon && React.cloneElement(svgIcon, { className: iconClassName })}
      </div>
      <div className="btn-link-wrapper">
        <span className={`${linkTextColor} text-4xl`}>{textOne}</span>
        <span className={`${linkTextColor} text-4xl`}>{textTwo}</span>
      </div>
    </button>
  );
};

export default Button;
