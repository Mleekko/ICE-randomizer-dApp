import {RadixNetwork} from "@radixdlt/radix-dapp-toolkit";

export declare type EnvConfig = {
    network: (typeof RadixNetwork)[keyof typeof RadixNetwork];
    water_resource: string;
    ice_resource: string;
    rrc404_component: string;

    component: string;
    ticket: string;
    dapp_definition: string;
}

// export const Config: EnvConfig = {
//     network: RadixNetwork.Stokenet,
//     water_resource: "resource_tdx_2_1thpd5wxvj7pz4u67z39l424vd4ajnnnx2sjff8wktq6cnlwkenwe0e",
//     ice_resource: "resource_tdx_2_1n2aclv9vx3z2hxxxafswfqlpt3cvqfkw7dc4eqrp8n4yan6s47ad0n",
//     rrc404_component: "component_tdx_2_1czuyqr546ptgwn40gtearfe39jfp4w55jx8fsfyanna896l7s4sc8a",
//     component: "component_tdx_2_1czadk6hya6s0h6sta80leclx49fjzr9r7h46xcvzc7pkqpu68gm4e9",
//     ticket: "resource_tdx_2_1ntpr2235detjyx9k5tujrl75xmqtqgvfkqswymy9f99hvdzxrrf7d5",
//     dapp_definition: "account_tdx_2_128uvygwu4d80fu32n29wqy84e35xhg3xtgq0m4wkgkdghju7cke5fz",
// };
export const Config: EnvConfig = {
    network: RadixNetwork.Mainnet,
    water_resource: "resource_rdx1t4h4396mukhpzdrr5sfvegjsxl8q7a34q2vkt4quxcxahna8fucuz4",
    ice_resource: "resource_rdx1n2y299ekzx4au2v9yjmxzu650ulvk5ndx3u5tlevfclk0uvdgs30px",
    rrc404_component: "component_rdx1czscv9f2mv034hewjplej5ef4f2ecug2fxxelfpgxrsrhw4mglq2yp",
    component: "component_rdx1cqhu7v4xkg7q8p7w9vwssfd9kse6kplr9ku8q5x3lc7r6qzk0vumhf",
    ticket: "resource_rdx1nfkn6uz75skgzwl65fe70ajkcrknr7xax0ydmhpu0zkggtfl5m47yr",
    dapp_definition: "account_rdx12xyvn0ep9r0s3s5pf788q9d2ldhf79wz0m8a06djuv70r4gsvsnhye",
};
