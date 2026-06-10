export interface CameraInfo {
  name: string
  url: string

  // defaults
  refreshInterval?: number
  cacheBust?: boolean
  proxy?: boolean
}

export interface LocationGroup {
  id: string
  name: string
  cameras: CameraInfo[]
}
const now = new Date(Date.now() - 5 * 60 * 1000)
const pad = (n: number) => n.toString().padStart(2, '0')
const dateStamp =`${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate()+1)}` //yyyymmdd
const timestamp =`${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}` //utc timestamp
const year = `${now.getFullYear()}`
const month = `${pad(now.getMonth() + 1)}`
const date  = `${pad(now.getDate())}`
const hourNum = `${pad(now.getHours())}`
export const locations: LocationGroup[] = [
  {
    id: 'passes',
    name: '🛣️ Passes',
    cameras: [
      {
        name: 'SR 18 - Tiger Mountain',
        url: 'https://images.wsdot.wa.gov/nw/018vc02357.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'I 90 - Snoqualmie Pass',
        url: 'https://images.wsdot.wa.gov/sc/090VC05347.jpg',
        refreshInterval: 2 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'KOMO Snoqualmie',
        url: 'https://komonews.com/resources/ftptransfer/komo/maps/Snoqualmie_ski_cam.jpg',
        refreshInterval: 2 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'US 12 - White Pass',
        url: 'https://images.wsdot.wa.gov/sc/012vc15095.jpg?a=1780820472887',
        refreshInterval: 2 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'US 2 - Stevens Pass',
        url: 'https://images.wsdot.wa.gov/nc/002vc06458.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'US 97 - Blewett Pass',
        url: 'https://images.wsdot.wa.gov/nc/097vc16375.jpg',
        refreshInterval: 2 * 60 * 1000,
        cacheBust: true
      }
    ]
  },
  {
    id: 'olympia',
    name: '🏠 Olympia',
    cameras: [
      {
        name: 'Olympia East',
        url: 'https://images.wsdot.wa.gov/orflow/005vc10520.jpg',
        refreshInterval: 2 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'Olympia West',
        url: 'https://images.wsdot.wa.gov/orflow/101vc36664.jpg',
        refreshInterval: 2 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'Downtown',
        url: 'https://imgproxy.windy.com/_/full/plain/current/1362140016/original.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'Cirque Exit',
        url: 'https://images.wsdot.wa.gov/orflow/005vc11127.jpg',
        refreshInterval: 2 * 60 * 1000,
        cacheBust: true
      }
    ]
  },
  {
    id: 'waCities',
    name: '🏙️ Washington Cityscapes',
    cameras: [
      {
        name: 'Leavenworth',
        url: 'https://skileavenworth.com/sites/default/files/webcams/irtimage.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'Seattle',
        url: 'https://cdn.tegna-media.com/king/weather/roofcam1.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },      
      {
        name: "KOMO Seattle",
        url: `https://komonews.com/resources/ftptransfer/komo/maps/ColumbiaCam.jpg`,
        refreshInterval: 10000,
        cacheBust: true
     },
      {
        name: 'Tacoma',
        url: 'https://cdn.tegna-media.com/king/weather/tacoma.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      }
    ]
  },
  {
    id: 'waDestinations',
    name: '🌳 Nature Destinations',
    cameras: [
      {
        name: "Hurricane Ridge",
        url: "https://www.nps.gov/webcams-olym/southcam.jpg",
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
      {
        name: "Enchantments",
        url: "https://www.iciclechalet.com/cam/icview.jpg",
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
      {
        name: "Crater Lake",
        url: "https://www.nps.gov/webcams-crla/camerasinnott.jpg?1780821123575",
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      }
    ]
  },
  {
    id: 'wamountains',
    name: '🏔️ WA Mountains',
    cameras: [
      {
        name: 'St. Helens',
        url: 'https://volcanoes.usgs.gov/vsc/captures/st_helens/jro-webcam.jpg',
        refreshInterval: 10 * 60 * 1000,
       cacheBust: true
      },
      {
        name: 'Rainier - gh.jpg',
        url: 'https://www.nps.gov/webcams-mora/gh.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'Rainier - mountain.jpg',
        url: 'https://www.nps.gov/webcams-mora/mountain.jpg',
        refreshInterval: 10 * 60 * 1000,
       cacheBust: true
      },
      {
        name: "North Cascades",
        url: "https://www.nps.gov/featurecontent/ard/webcams/images/nocalarge.jpg",
       cacheBust: true
      }
    ]
  },
  {
    id: 'mountains',
    name: '⛰️ Mountains',
    cameras: [
      {
        name: 'Jefferson',
        url: 'https://timberlinelodge.com/snowcameras/brunotop.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'Shasta',
        url: 'https://sc.snowcrest.net/images/camera/snowcam-high000M.jpg?nocache=1780642086',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'Lake Shastina',
        url: 'https://data.hazcams.com/thumbnails/lake-shastina-ca-us-001/medium.webp',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      }
    ]
  },
  {
    id: 'bikeAreas',
    name: '🚵 Trailheads',
    cameras: [
      
      
      {
        name: 'Silver Fir',
        url: 'https://img.youtube.com/vi/H7HwsNLqVC8/maxresdefault.jpg',
        cacheBust: false,
        refreshInterval: 10 * 60 * 1000
      },
      {
        name: 'Timberline',
        url: 'https://timberlinelodge.com/snowcameras/FloodSouth.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      }
    ]
  },
  {
    id: 'whistler',
    name: '😮‍💨 Whistler',
    cameras: [
      {
        name: 'Creekside',
        url: 'https://common.snow.com/Mtncams/creek.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'Village',
        url: `https://whistlerpeak.com/wx_img/fitz/${year}-${month}-${date}-${hourNum}.jpg`,
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'On Mountain',
        url: 'https://images-webcams.windy.com/08/1633447108/current/full/1633447108.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      }
    ]
  },
  
  {
    id: 'tennessee',
    name: '🟧 Tennessee',
    cameras: [
      {
        name: 'Johnson City Roan St',
        url: 'https://wcyb.com/resources/ftptransfer/wcyb/maps/JohnsonCityHolidayInn.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'Johnson City Downtown',
        url: 'https://wcyb.com/resources/ftptransfer/wcyb/maps/TownviewCamera.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      }
    ]
  },
 
  {
    id: 'florida',
    name: '🐬 Florida',
    cameras: [
      {
        name: 'Ellenton - 75 at 301',
        url: 'https://fl511.com/map/Cctv/5331',
        refreshInterval: 2 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'Ellenton Riverfront',
        url: 'http://71.41.85.58/jpg/image.jpg',
        refreshInterval: 2 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'Holmes Beach',
        url: 'https://images-webcams.windy.com/08/1693388411/current/full/1693388411.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
    ]
  },

  {
    id: 'alabama',
    name: '🏈 Alabama',
    cameras: [
      {
        name: 'Birmingham - Regions Center',
        url: 'https://images-webcams.windy.com/08/1793882255/current/full/1793882255.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'Tuscaloosa - Bryant Denny',
        url: 'https://data.hazcams.com/thumbnails/tuscaloosa-al-us-001/medium.webp',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'Huntsville',
        url: 'https://images-webcams.windy.com/08/1397406628/current/full/1397406628.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
    ]
  },
  {
    id: 'desert',
    name: '🌵 Desert',
    cameras: [
      {
        name: 'Joshua Tree',
        url: 'https://www.nps.gov/featurecontent/ard/webcams/images/jotrlarge.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'Grand Canyon',
        url: 'https://cdn.pixelcaster.com/public.pixelcaster.com/snapshots/grandcanyon-2/latest.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      },
      {
        name: 'Bryce Canyon',
        url: 'https://www.nps.gov/featurecontent/ard/webcams/images/brda.jpg',
        refreshInterval: 10 * 60 * 1000,
        cacheBust: true
      }
    ]
  }
  
  
]