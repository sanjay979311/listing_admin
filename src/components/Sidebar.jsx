


import { useState } from 'react';

import { Link } from "react-router";

const SideBar = () => {
    const [logoApi, setLogoApi] = useState(null);
    const [itemIndex, setItemIndex] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);




    const handleClick = (index) => {
        setItemIndex(index);
        setSidebarOpen(!sidebarOpen);
    };

    const handleSidebarClose = () => {
        const sidebar = document.getElementById('sidebar');
        console.log("sidebar is ======>", sidebar)
        if (sidebar) {
            sidebar.classList.add('close');
            sidebar.classList.remove('open');
        }
    };


    const menuItems = [
        { title: 'Dashboard', icon: 'fa-solid fa-chart-line', link: '/dashboard' },

        {
            title: 'Logo',
            icon: 'fa-solid fa-image',
            subItems: [
                { title: 'Logo List', link: '/dashboard/logo-list' },
            ],
        },
        {
            title: 'Location', icon: 'fa-solid fa-location-dot', subItems: [
                { title: 'Country List', link: '/dashboard/country-list' },
                { title: 'State List', link: '/dashboard/state-list' },
                { title: 'City List', link: '/dashboard/city-list' },
                { title: 'Area List', link: '/dashboard/area-list' } // ✅ Added Area here
            ]
        },
        // {
        //     title: 'Banner',
        //     icon: 'fa-solid fa-images',
        //     subItems: [
        //         { title: 'Banner List', link: '/dashboard/banner-list' },

        //     ],
        // },
        // {
        //     title: 'Pages Management',
        //     icon: 'fa-solid fa-file-alt',
        //     subItems: [
        //         { title: 'About Page', icon: 'fa-solid fa-info-circle', link: '/dashboard/pages-about' },
        //         { title: 'Contact Page', icon: 'fa-solid fa-envelope', link: '/dashboard/pages-contact' },
        //         { title: 'Terms & Conditions', icon: 'fa-solid fa-file-contract', link: '/dashboard/pages-terms' },
        //         { title: 'Privacy Policy', icon: 'fa-solid fa-user-shield', link: '/dashboard/pages-privacy' },
        //         { title: 'FAQ Page', icon: 'fa-solid fa-question-circle', link: '/dashboard/pages-faq' },
        //     ],
        // },


        {
            title: 'Category',
            icon: 'fa-solid fa-layer-group',

            subItems: [
                { title: 'Category List', link: '/dashboard/category-list' },
            ],
        },



        // {
        //     title: 'Sub Category',
        //     icon: 'fa fa-list-alt',
        //     subItems: [
        //         {
        //             title: 'Sub Category List',
        //             link: '/dashboard/sub-category-list'
        //         }]
        // },
        // {
        //     title: 'Courses',
        //     icon: 'fa-solid fa-book',

        //     subItems: [
        //         { title: 'Manage Course', link: '/dashboard/manage-course' },
        //     ],
        // },

        {
            title: 'Users',
            icon: 'fa-solid fa-user-graduate',
            subItems: [
                { title: 'Manage Students', icon: 'fa-solid fa-list', link: '/dashboard/student-list' },
                { title: 'Add New Student', icon: 'fa-solid fa-user-plus', link: '/dashboard/add-student' },
                { title: 'Manage Student', icon: 'fa-solid fa-book-open', link: '/dashboard/student-courses' },
                { title: 'Progress & Performance', icon: 'fa-solid fa-chart-line', link: '/dashboard/student-progress' },
                { title: 'Certificates', icon: 'fa-solid fa-certificate', link: '/dashboard/student-certificates' },
            ],
        },
        // {
        //     title: 'Packages',
        //     icon: 'fa-solid fa-box-open',
        //     subItems: [
        //         { title: 'Package List', icon: 'fa-solid fa-list', link: '/dashboard/package-list' },
        //         { title: 'Add Package', icon: 'fa-solid fa-plus', link: '/dashboard/add-package' },

        //     ],
        // },
        // {
        //     title: 'Faq',
        //     icon: 'fa-solid fa-circle-question',
        //     subItems: [
        //         { title: 'Faq List', icon: 'fa-solid fa-list', link: '/dashboard/faq-list' },
        //         { title: 'Add Faq', icon: 'fa-solid fa-plus', link: '/dashboard/add-faq' },

        //     ],
        // },

        // {
        //     title: 'Orders',
        //     icon: 'fa-solid fa-shopping-cart',
        //     subItems: [
        //         { title: 'Order List', icon: 'fa-solid fa-list', link: '/dashboard/orders-list' },
        //         { title: 'Pending Orders', icon: 'fa-solid fa-clock', link: '/dashboard/orders-pending' },
        //         { title: 'Completed Orders', icon: 'fa-solid fa-check', link: '/dashboard/orders-completed' },
        //     ],
        // },

        // {
        //     title: 'Blog',
        //     icon: 'fa-solid fa-blog',
        //     subItems: [
        //         { title: 'Blog List', icon: 'fa-solid fa-list', link: '/dashboard/blog-list' },
        //         { title: 'Add Blog', icon: 'fa-solid fa-plus', link: '/dashboard/add-blog' },

        //     ],
        // },
        {
    title: 'Ads Management',
    icon: 'fa-solid fa-bullhorn',
    subItems: [
        { title: 'Ads List', icon: 'fa-solid fa-list', link: '/dashboard/ads-list' },
        // { title: 'Add Listing', icon: 'fa-solid fa-plus', link: '/dashboard/add-listing' },
        { title: 'Create Multiple Ads', icon: 'fa-solid fa-layer-group', link: '/dashboard/create-bulk-ads' },
        // { title: 'Edit / Delete Listings', icon: 'fa-solid fa-pen-to-square', link: '/dashboard/manage-listings' },
    ],
},


        {
            title: 'SEO',
            icon: 'fa-solid fa-search',
            subItems: [
                { title: 'SEO Settings', icon: 'fa-solid fa-gear', link: '/dashboard/seo-settings' },
                { title: 'Meta Tags', icon: 'fa-solid fa-tags', link: '/dashboard/meta-tags' },
                { title: 'Sitemap', icon: 'fa-solid fa-sitemap', link: '/dashboard/sitemap' },
            ],
        },
        {
            title: 'Change Password',
            icon: 'fa-solid fa-key',
            link: '/dashboard/change-password',
        },
        {
            title: 'Web Info',
            icon: 'fa-solid fa-globe',
            link: '/dashboard/web-info',
        },

        {
            title: 'Settings',
            icon: 'fa-solid fa-gear',
            subItems: [
                { title: 'SEO Template', link: '/dashboard/seo-template' }
            ]
        }


    ];

    return (
        <aside>
            <div className="sidebar border-end bg-white overflow-hidden sticky-top" id="sidebar">
                <div className="sidebar-header d-flex align-items-center justify-content-between ps-4">
                    <div className="logo">
                        <img
                            className="default-logo"
                            // src={logoApi ? logoApi[1]?.logo_img : "/img/pixer_dark.webp"}
                            src="https://digitalindialearning.com/img/logo.png"
                            width="115"
                            alt="Logo"
                        />
                        <img
                            className="collapsed-logo"
                            // src={logoApi ? logoApi[3]?.logo_img : "/img/pixer-collapse-logo.webp"}
                            src="https://digitalindialearning.com/img/logo.png"
                            alt="Logo"
                            style={{ width: '28px' }}
                        />
                    </div>
                    <div>
                        <button className="btn d-md-none" type="button" onClick={handleSidebarClose}>
                            <div className="icon icon-sm sidebar-close-btn">
                                <i className="fa-solid fa-close"></i>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="h-100 overflow-auto p-4 " id="sidebar-scroller">
                    <ul className="menu mb-5">

                        {menuItems.map((item, index) => (
                            <li key={index} className={`menu-item ${item.subItems ? ` has-menu-sub ${sidebarOpen && itemIndex === index ? 'open' : ''}` : ''}`}>
                                <Link to={item.link || '#'} className="menu-link" onClick={() => handleClick(index)}>
                                    <span className="menu-icon"><i className={item.icon}></i></span>
                                    <span className="menu-text">{item.title}</span>
                                </Link>
                                {item.subItems && (
                                    <ul className="menu-sub">
                                        {item.subItems.map((subItem, subIndex) => (
                                            <li key={subIndex} className="menu-item">
                                                <Link to={subItem.link} className="menu-link">{subItem.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
