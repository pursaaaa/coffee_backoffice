import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import config from '../config'
import { Link, useNavigate } from 'react-router-dom'


function Sidebar() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get(config.apiPath + '/user/info', config.headers());

      if (result.data.result !== undefined) {
        setUser(result.data.result)
      }
    } catch (e) {
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error'
      })
    }
  }

  const handleSignOut = async () => {
    try {
      const button = await Swal.fire({
        title: 'ออกจากระบบ',
        text: 'ยืนยันออกจากระบบ',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true
      })

      if (button.isConfirmed) {
        localStorage.removeItem('token');
        navigate('/');
      }
    } catch (e) {
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error'
      })
    }
  }

  return (
    <>
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <Link to='/product' class="brand-link">
          <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span class="brand-text font-weight-light">Coffee Backoffice</span>
        </Link>

        <div class="sidebar">
          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
              <img src="dist/img/kao-chan.png" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div class="info">
              <a href="#" className="d-block">{user.name}</a>
              <button onClick={handleSignOut} className='btn btn-danger'>
                <i className='fa fa-times mr-2'>   Sign Out</i>
              </button>
            </div>
          </div>

          <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

              <li class="nav-header">Menu</li>
              <li class="nav-item">
                <Link to='/dashboard' class="nav-link">
                  <i class="nav-icon fas fa-columns"></i>
                  <p>
                    Dashboard
                  </p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/product" class="nav-link">
                  <i class="nav-icon fa fa-box"></i>
                  <p>
                    สินค้า
                    <span class="badge badge-info right">2</span>
                  </p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to='/billSale' class="nav-link">
                  <i class="nav-icon fa fa-list"></i>
                  <p>
                    รายงานยอดขาย
                  </p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to='/reports' class="nav-link">
                  <i class="nav-icon fa fa-file"></i>
                  <p>
                    ตรวจสอบยอดขาย
                  </p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

