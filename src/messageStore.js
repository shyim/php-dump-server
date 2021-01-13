import { writable } from 'svelte/store';

const tmpContent = {
    "uuid": "UUID",
    "time": "timestamp",
    "tags": ["Query"],
    "payloads": [
        {
            "type": "code",
            "content": {
                "language": "sql",
                "value": "INSERT INTO\n\tswkweb_pseudovariants_pseudovariants_ro (\n\t\tproduct_id,\n\t\tproduct_version_id,\n\t\tmain_pseudovariant_product_id,\n\t\tmain_pseudovariant_product_version_id,\n\t\tswkweb_pseudovariants_pseudovariant_group_id,\n\t\tis_main_pseudovariant\n\t)\n\tSELECT\n\t\tproduct.id,\n\t\tproduct.version_id,\n\t\tmainPseudovariant.product_id,\n\t\tmainPseudovariant.product_version_id,\n\t\tpseudovariantGroup.id,\n\t\tIF(pseudovariant.id IS NULL, NULL, pseudovariant.id = mainPseudovariant.id)\n\tFROM\n\t\tproduct\n\t\tLEFT JOIN\n\t\t\tproduct parent\n\t\t\tON parent.id = product.parent_id AND parent.version_id = product.version_id\n\t\tLEFT JOIN\n\t\t\tswkweb_pseudovariants_pseudovariant pseudovariant\n\t\t\tON pseudovariant.product_id = IFNULL(parent.id, product.id) AND pseudovariant.product_version_id = IFNULL(parent.version_id, product.version_id)\n\t\tLEFT JOIN\n\t\t\tswkweb_pseudovariants_pseudovariant_group pseudovariantGroup\n\t\t\tON pseudovariantGroup.id = pseudovariant.swkweb_pseudovariants_pseudovariant_group_id\n\t\tLEFT JOIN\n\t\t\tswkweb_pseudovariants_main_pseudovariant_mapping mainPseudovariantMapping\n\t\t\tON mainPseudovariantMapping.swkweb_pseudovariants_pseudovariant_group_id = pseudovariantGroup.id\n\t\tLEFT JOIN\n\t\t\tswkweb_pseudovariants_pseudovariant mainPseudovariant\n\t\t\tON mainPseudovariant.id = mainPseudovariantMapping.swkweb_pseudovariants_pseudovariant_id\n\tWHERE\n\t\t(product.id IN (:ids) OR product.parent_id IN (:ids)) AND product.version_id = :version\nON DUPLICATE KEY UPDATE\n\tmain_pseudovariant_product_id = VALUES(main_pseudovariant_product_id),\n\tmain_pseudovariant_product_version_id = VALUES(main_pseudovariant_product_version_id),\n\tswkweb_pseudovariants_pseudovariant_group_id = VALUES(swkweb_pseudovariants_pseudovariant_group_id),\n\tis_main_pseudovariant = VALUES(is_main_pseudovariant)\n"
            }
        },
        {
            "type": "html",
            "content": "<strong>HTML FROM SYMFONY VAR_DUMPER</strong>"
        },
        {
            "type": "table",
            "content": {
                "header": ["Header 1", "Header 2"],
                "rows": [
                    ["Val1", "Val2"],
                    ["Val3", "Val4"]
                ]
            }
        }
    ],
    "origin": {
        "file": "xxx.php",
        "line_number": 1234
    }
}

export const messageStore = writable([tmpContent]);
