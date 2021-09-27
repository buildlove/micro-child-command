import Home from '@src/pages/Home'

export default function getAppRoutes(url) {
  return [
    {
      path: `${url}/demoMap/view`,
      component: Home,
    }
  ];
}
