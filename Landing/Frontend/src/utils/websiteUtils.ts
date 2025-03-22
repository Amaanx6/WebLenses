// src/utils/websiteUtils.ts
export const extractWebsitesFromSnapshots = (snapshots: any[]): string[] => {
    const urlMap = new Map<string, number>();
    
    snapshots.forEach(snapshot => {
      const count = urlMap.get(snapshot.url) || 0;
      urlMap.set(snapshot.url, count + 1);
    });
  
    return Array.from(urlMap.keys()).sort((a, b) => {
      const countA = urlMap.get(a)!;
      const countB = urlMap.get(b)!;
      return countB - countA;
    });
  };