
 const express = require('express');
 const path = require('path');
 const app = express();
 
 const PORT = process.env.PORT || 5000;
 const pagesDir = path.join(__dirname, 'pages');
 
 // Middleware to serve the frontend pages from the existing pages folder
 app.use(express.static(pagesDir));
 
// Simulated FoodExpress backend data
const foodExpressData = {
    restaurants: [
        { id: 'r-01', name: 'Street Flame Kitchen', area: 'Downtown', eta: '18 min' },
        { id: 'r-02', name: 'Rice Bowl Express', area: 'Riverside', eta: '24 min' },
        { id: 'r-03', name: 'Bistro Go', area: 'City Center', eta: '15 min' }
    ],
    menu: [
        { id: 'm-01', name: 'Charred Chicken Rice', restaurant: 'Street Flame Kitchen', category: 'Rice Bowl', price: 7.5, eta: '18 min', badge: 'Bestseller' },
        { id: 'm-02', name: 'Spicy Beef Noodles', restaurant: 'Rice Bowl Express', category: 'Noodles', price: 6.9, eta: '24 min', badge: 'Hot' },
        { id: 'm-03', name: 'Crispy Salmon Wrap', restaurant: 'Bistro Go', category: 'Wraps', price: 8.4, eta: '15 min', badge: 'New' },
        { id: 'm-04', name: 'Chicken Katsu Burger', restaurant: 'Street Flame Kitchen', category: 'Burger', price: 7.2, eta: '20 min', badge: 'Popular' },
        { id: 'm-05', name: 'Mango Sticky Rice', restaurant: 'Bistro Go', category: 'Dessert', price: 4.2, eta: '14 min', badge: 'Sweet' }
     ],
    orders: [
        { id: 'FEX-2048', customer: 'Sok Ly', item: 'Charred Chicken Rice', status: 'On the way', rider: 'Dara', total: 9.3, progress: 72 },
        { id: 'FEX-2047', customer: 'Chanrath S.', item: 'Spicy Beef Noodles', status: 'Delivered', rider: 'Pheap', total: 8.6, progress: 100 },
        { id: 'FEX-2046', customer: 'Borey K.', item: 'Crispy Salmon Wrap', status: 'Preparing', rider: 'Pending', total: 10.1, progress: 38 }
    ],
    overview: {
        restaurantsOnline: 28,
        activeRiders: 14,
        avgDelivery: '22 min',
        ordersToday: 146
    }
 };
 
 const pages = [
     {
        id: 'home',
         path: '/',
        title: 'Home',
         file: 'index.html'
     },
     {
        id: 'menu',
        path: '/menu',
        title: 'Menu',
         file: 'courses.html'
     },
     {
        id: 'orders',
        path: '/orders',
        title: 'Orders',
         file: 'grades.html'
     }
 ];

const routeAliases = [
    { route: '/courses', file: 'courses.html' },
    { route: '/grades', file: 'grades.html' }
];
 
 // API endpoints for navigation and sample data
 app.get('/api/pages', (req, res) => res.json(pages));
 app.get('/api/pages/:pageId', (req, res) => {
     const page = pages.find((item) => item.id === req.params.pageId);
 
     if (!page) {
         return res.status(404).json({ error: 'Page not found' });
     }
 
     return res.json(page);
 });
 
app.get('/api/restaurants', (req, res) => res.json(foodExpressData.restaurants));
app.get('/api/menu', (req, res) => res.json(foodExpressData.menu));
app.get('/api/orders', (req, res) => res.json(foodExpressData.orders));
app.get('/api/overview', (req, res) => res.json(foodExpressData.overview));
app.get('/api/courses', (req, res) => res.json(foodExpressData.menu));
app.get('/api/grades', (req, res) => res.json(foodExpressData.orders));
app.get('/health', (req, res) => res.status(200).json({ status: 'UP', service: 'FoodExpress Simulation' }));
 
 // Route handlers to serve the specific HTML files
 app.get('/', (req, res) => res.sendFile(path.join(pagesDir, 'index.html')));
app.get('/menu', (req, res) => res.sendFile(path.join(pagesDir, 'courses.html')));
app.get('/orders', (req, res) => res.sendFile(path.join(pagesDir, 'grades.html')));
routeAliases.forEach(({ route, file }) => {
    app.get(route, (req, res) => res.sendFile(path.join(pagesDir, file)));
});
 app.get('/index.html', (req, res) => res.sendFile(path.join(pagesDir, 'index.html')));
 app.get('/courses.html', (req, res) => res.sendFile(path.join(pagesDir, 'courses.html')));
 app.get('/grades.html', (req, res) => res.sendFile(path.join(pagesDir, 'grades.html')));
 
 // Convenience route so the root page can act as a simple API-driven entry point.
 app.get('/api', (req, res) => {
     res.json({
        service: 'FoodExpress Simulation',
         pages,
        restaurants: foodExpressData.restaurants,
         routes: {
            home: '/',
            menu: '/menu',
            orders: '/orders'
         }
     });
 });
 
 app.listen(PORT, "0.0.0.0", () => {
     console.log(`=========================================`);
    console.log(`FOODEXPRESS SIMULATION STARTING...`);
     console.log(`Local URL: http://localhost:${PORT}`);
     console.log(`=========================================`);
 });