import React from 'react';

import { heart } from '../imports/importFolder';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <div>
        <img src={heart} />
      </div>
      <article className='three-icon'>
        <Link>
          <div>
            <span className='material-symbols-outlined'>
              <span className='material-symbols-outlined'>
                format_list_bulleted
              </span>
            </span>
          </div>
        </Link>
        <Link>
          <div>
            <span className='material-symbols-outlined'>replay</span>
          </div>
        </Link>
        <Link>
          <div>
            <span className='material-symbols-outlined'>insert_chart</span>
          </div>
        </Link>
      </article>
      <Link>
        <div>
          <span className='material-symbols-outlined cart'>shopping_cart</span>
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar;
