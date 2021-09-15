document.addEventListener('DOMContentLoaded', async (event) => { 
    // init
    await R2U.init({ customerId: '5e8e7580404328000882f4ae' })
    const sku = 'RE000001'
    const isActive = R2U.sku.isActive(sku)
    console.log(isActive)
  
    if (!sku || !isActive) {
      document.getElementById('ar-button').remove()
      return
    }
  
    const fallbackOptions = {
      alertMessage: 'Sentimos muito, mas infelizmente seu dispositivo não é compatível com a visualização em Realidade Aumentada :(',
      fallback: 'viewer'
    }
  
    if (window.innerWidth <= 1024) {
      // if mobile
      // add behavior to button "veja na sua casa"
      const arArea = document.getElementById('r2u')
      arArea.innerHTML = '<div id="button-ar">Veja o Guldi na sua casa</div>'
      const arButton = document.getElementById('button-ar')
  
      await R2U.ar.attach({
        element: arButton,
        sku: sku,
        resize: true,
        showInstructions: 'always',
        fallbackOptions: fallbackOptions
      })
    } else {
    // if desktop
    // add viewer
      const viewerPosition = document.getElementById('r2u-viewer')
      const poster = 'https://real2u-public-assets.s3.amazonaws.com/images/cadeira.png'
      const progressBarColor = '#0c0e5a'
      await R2U.viewer.create({
        element: viewerPosition,
        popup: true,
        sku: sku,
        poster: poster,
        progressBarColor: progressBarColor
      })
    
      // add qrcode
      const node = document.getElementById('r2u-qrcode')
      await R2U.qrCode.create({
        element: node,
        sku: sku
      })
    
      // add open/close to modal
      console.log(document.getElementById('ar-button'))
      document.getElementById('ar-button').addEventListener('click', (e) => {
        const modal = document.getElementById('modal')
        modal.hidden = !modal.hidden
      })
    }
  })