export const colorSchemes = {
    sequential: {
      name: 'Sequential',
      schemes: [
        {
          name: 'Blues',
          colors: {
            3: ['#deebf7', '#9ecae1', '#3182bd'],
            4: ['#eff3ff', '#bdd7e7', '#6baed6', '#2171b5'],
            5: ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'],
            6: ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#3182bd', '#08519c'],
            7: ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594'],
            8: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594'],
            9: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b']
          }
        },
        {
          name: 'Greens',
          colors: {
            3: ['#e5f5e0', '#a1d99b', '#31a354'],
            4: ['#edf8e9', '#bae4b3', '#74c476', '#238b45'],
            5: ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c'],
            6: ['#edf8e9', '#c7e9c0', '#a1d99b', '#74c476', '#31a354', '#006d2c'],
            7: ['#edf8e9', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#005a32'],
            8: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#005a32'],
            9: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b']
          }
        },
        {
          name: 'Reds',
          colors: {
            3: ['#fee0d2', '#fc9272', '#de2d26'],
            4: ['#fee5d9', '#fcae91', '#fb6a4a', '#cb181d'],
            5: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
            6: ['#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#de2d26', '#a50f15'],
            7: ['#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#99000d'],
            8: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#99000d'],
            9: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d']
          }
        }
      ]
    },
    diverging: {
      name: 'Diverging',
      schemes: [
        {
          name: 'RdBu',
          colors: {
            3: ['#ef8a62', '#f7f7f7', '#67a9cf'],
            4: ['#ca0020', '#f4a582', '#92c5de', '#0571b0'],
            5: ['#ca0020', '#f4a582', '#f7f7f7', '#92c5de', '#0571b0'],
            6: ['#b2182b', '#ef8a62', '#fddbc7', '#d1e5f0', '#67a9cf', '#2166ac'],
            7: ['#b2182b', '#ef8a62', '#fddbc7', '#f7f7f7', '#d1e5f0', '#67a9cf', '#2166ac'],
            8: ['#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac'],
            9: ['#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac'],
            10: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
            11: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061']
          }
        },
        {
          name: 'PiYG',
          colors: {
            3: ['#e9a3c9', '#f7f7f7', '#a1d76a'],
            4: ['#d01c8b', '#f1b6da', '#b8e186', '#4dac26'],
            5: ['#d01c8b', '#f1b6da', '#f7f7f7', '#b8e186', '#4dac26'],
            6: ['#c51b7d', '#e9a3c9', '#fde0ef', '#e6f5d0', '#a1d76a', '#4d9221'],
            7: ['#c51b7d', '#e9a3c9', '#fde0ef', '#f7f7f7', '#e6f5d0', '#a1d76a', '#4d9221'],
            8: ['#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221'],
            9: ['#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221'],
            10: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
            11: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419']
          }
        }
      ]
    },
    qualitative: {
      name: 'Qualitative',
      schemes: [
        {
          name: 'Set1',
          colors: {
            3: ['#e41a1c', '#377eb8', '#4daf4a'],
            4: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3'],
            5: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00'],
            6: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33'],
            7: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628'],
            8: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf'],
            9: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999']
          }
        },
        {
          name: 'Pastel1',
          colors: {
            3: ['#fbb4ae', '#b3cde3', '#ccebc5'],
            4: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4'],
            5: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6'],
            6: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc'],
            7: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd'],
            8: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec'],
            9: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2']
          }
        },
        {
          name: 'Dark2',
          colors: {
            3: ['#1b9e77', '#d95f02', '#7570b3'],
            4: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a'],
            5: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e'],
            6: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02'],
            7: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d'],
            8: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666']
          }
        }
      ]
    }
  };
