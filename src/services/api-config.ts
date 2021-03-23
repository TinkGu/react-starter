type BuildType = 'prod' | 'uat' | 'test';

interface IlinkMap {
  [key: string]: {
    prod: string;
    uat: string;
    test: string;
  };
}

/**
 * 根据当前环境，获得域名配置地址
 */
function getHostConfig() {
  const hostConfig: Record<string, string> = {};
  let type = process.env.BUILD_TYPE as BuildType;
  if (!['prod', 'uat', 'test'].includes(type)) {
    type = 'test';
  }

  const linkMap: IlinkMap = {
    /** 配置域名地址 */
    apiHost: {
      prod: '',
      uat: '',
      test: '',
    },
    // ---- 可以把各种区分环境的域名配置在下面 ----
  };

  Object.keys(linkMap).forEach((key) => {
    hostConfig[key] = linkMap[key][type];
  });

  return hostConfig;
}

export default getHostConfig();
