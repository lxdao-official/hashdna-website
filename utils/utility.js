export const formatAddress = (address) => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};

export const scrollToSection = (id, offset = 0) => {
  const ele = document.getElementById(id);
  let realTop = ele.offsetTop;
  realTop += ele.offsetParent.offsetTop;
  window.scrollTo({
    top: realTop - offset,
    behavior: 'smooth',
  });
};

export const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const getRandom = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) {
    return arr;
  }
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

export const setLocalStorage = (name, value) => {
  if (name && typeof window !== 'undefined') {
    window.localStorage.setItem(name, value);
  }
};

export const getLocalStorage = (name) => {
  if (name && typeof window !== 'undefined') {
    return window.localStorage.getItem(name);
  }
};

export const removeLocalStorage = (name) => {
  if (name && typeof window !== 'undefined') {
    return window.localStorage.removeItem(name);
  }
};

export function getEtherScanDomain() {
  return process.env.NEXT_PUBLIC_CHAIN_ID === '1'
    ? 'etherscan.io'
    : 'goerli.etherscan.io';
}

export function getOpenSeaDomain() {
  return process.env.NEXT_PUBLIC_CHAIN_ID === '1'
    ? 'opensea.io'
    : 'testnets.opensea.io';
}

export function convertIpfsGateway(ipfsUrl) {
  // https://cloudflare-ipfs.com/ipfs/bafkreid67qrfaq2yqacnsvpvfnetjocgy7kiuwu4jw4v23tc3yqgfgis2e
  // to
  // https://bafkreid67qrfaq2yqacnsvpvfnetjocgy7kiuwu4jw4v23tc3yqgfgis2e.ipfs.nftstorage.link/
  if (ipfsUrl && ipfsUrl.includes('cloudflare-ipfs')) {
    const cid = ipfsUrl.replace('https://cloudflare-ipfs.com/ipfs/', '');
    return `https://${cid}.ipfs.nftstorage.link`;
  }
  return ipfsUrl;
}

export function getIpfsCid(ipfsUrl) {
  // https://cloudflare-ipfs.com/ipfs/bafkreid67qrfaq2yqacnsvpvfnetjocgy7kiuwu4jw4v23tc3yqgfgis2e
  // https://bafkreid67qrfaq2yqacnsvpvfnetjocgy7kiuwu4jw4v23tc3yqgfgis2e.ipfs.nftstorage.link/
  // to
  // bafkreid67qrfaq2yqacnsvpvfnetjocgy7kiuwu4jw4v23tc3yqgfgis2e
  let cid = '';
  if (ipfsUrl && ipfsUrl.includes('cloudflare-ipfs')) {
    cid = ipfsUrl.replace('https://cloudflare-ipfs.com/ipfs/', '');
  } else if (ipfsUrl && ipfsUrl.includes('ipfs.nftstorage.link')) {
    cid = ipfsUrl.replace('https://', '').replace('.ipfs.nftstorage.link', '');
  }
  return cid;
}

// https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
export function removeEmpty(obj) {
  // eslint-disable-next-line no-unused-vars
  return Object.fromEntries(
    Object.entries(obj || {}).filter(([_, v]) => v != null && v != '')
  );
}

// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
export function groupBy(data, key) {
  return data.reduce((acc, cur) => {
    acc[cur[key]] = acc[cur[key]] || [];
    // if the key is new, initiate its value to an array, otherwise keep its own array value
    acc[cur[key]].push(cur);
    return acc;
  }, []);
}

export function stringCut(str, len) {
  let _str = '';
  if (str && str.length > len) {
    _str = `${str.substr(0, len)}...`;
  } else {
    _str = str;
  }
  return _str;
}

export function removeItem(array, item) {
  let tempArray = [...array];
  let index = tempArray.indexOf(item);

  if (index >= 0) {
    tempArray.splice(index, 1);
    return tempArray;
  }
  return tempArray;
}
/*
*
* 这段代码包含了一系列JavaScript辅助函数，用于在React应用程序中执行常见操作，例如格式化字符串、滚动到页面部分、从数组中随机获取元素等等。

其中一些函数的功能如下：

formatAddress：将以太坊地址字符串格式化为简短的形式。
scrollToSection：滚动到具有给定ID的页面部分。
shuffle：对数组进行乱序处理。
getRandom：从数组中随机选取一个或多个元素。
setLocalStorage：将值存储在浏览器的本地存储中。
getLocalStorage：从浏览器的本地存储中获取值。
removeLocalStorage：从浏览器的本地存储中删除值。
getEtherScanDomain：获取与以太坊主网或Goerli测试网络相关的区块链浏览器域名。
getOpenSeaDomain：获取与以太坊主网或测试网络相关的OpenSea市场域名。
convertIpfsGateway：将IPFS网关URL转换为IPFS存储桶URL。
getIpfsCid：从IPFS URL中提取CID。
removeEmpty：删除对象中空属性的记录。
groupBy：根据指定键对对象数组进行分组。
stringCut：截取字符串并添加省略号。
removeItem：从数组中删除指定项。
总之，这些帮助函数可以提高React应用程序的开发效率和代码重用性，使开发人员能够更快速和轻松地实现各种常见任务。
* */
