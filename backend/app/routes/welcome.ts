const welcomeMessage = "Welcome to the KIT Boilerplate API 1.0 !";
const welcomeRouteCallback = (req: any, res: any) => {
  res.send(welcomeMessage);
}

export default welcomeRouteCallback;