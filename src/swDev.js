export default function swDev()
{
  function determineAppServerKey() {
    const vapidPublicKey =
    "BMxdwmTz44vx_D870YRugVEu8K5tn49xLJK4JffnkNgSOPRhiU7rs0s-TlLE-ove5Bv_BzUKWjzE8VvBIC1incA";
      return urlBase64ToUint8Array(vapidPublicKey);
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  
    let swUrl=  `${process.env.PUBLIC_URL}/sw.js`
    navigator.serviceWorker.register(swUrl).then((response)=>{
        console.warn("response",response)

        return response.pushManager.getSubscription()
        .then(function (subscription) {
           response.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: determineAppServerKey()
          })
          

        })

    }) 
}