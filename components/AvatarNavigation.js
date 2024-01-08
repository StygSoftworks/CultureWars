import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function AvatarNavigation({ prevAvatar, nextAvatar }) {
  const router = useRouter();

  // Function to handle key press events
  const handleKeyPress = (event) => {
    if (event.key === 'ArrowLeft') {
      // Navigate to the previous avatar
      router.push(`/avatars/${prevAvatar.id}`);
    } else if (event.key === 'ArrowRight') {
      // Navigate to the next avatar
      router.push(`/avatars/${nextAvatar.id}`);
    }
  };

  // Set up the key press event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [prevAvatar, nextAvatar, router]);

  return (
    <div className='flex content-center'>
      <div>
        <Link href={`/avatars/${prevAvatar.id}`}>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            <span>Previous</span>
            <svg className="fill-current w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <g id="previous-icon">
                <path d="M7 10.5l6 6V4l-6 6z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </g>
            </svg>
          </span>
        </Link>
      </div>
      <div>
        <Link href={`/avatars/${nextAvatar.id}`}>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            <span>Next</span>
            <svg className="fill-current w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <g id="next-icon">
                <path d="M13 10.5l-6 6V4l6 6z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </g>
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default AvatarNavigation;
