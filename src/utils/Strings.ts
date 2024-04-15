export default class Strings {

    static displayHash(hash: string): string {
        return hash.substring(0, 5) + "..." + hash.substring(hash.length - 5);
    }

    static displayAddress(addr: string): string {
        return addr.length <= 15 ? addr : (addr.substring(0, addr.indexOf("1") + 6) + "..." + addr.substring(addr.length - 9));
    }
}
