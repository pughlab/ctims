import {flattenVariantCategoryContainerObject, addVariantCategoryContainerObject} from './helpers';

describe('test adding variantCategoryContainerObject to genomic criteria node for CTML and tree node ', () => {
  it('should flatten VariantCategoryContainerObject to CTML format', () => {
    const nodes = [
      {
        "key": "1",
        "label": "And",
        "data": {
          "and": []
        },
        "children": [
          {
            "key": "1",
            "label": "Genomic",
            "data": {
              "type": 3,
              "formData": {
                "variantCategoryContainerObject": {
                  "variant_category": "Mutation",
                  "hugo_symbol": "A1BG"
                }
              },
              "originalIndex": 0,
              "nodeLabel": "A1BG"
            },
            "icon": "genomic-icon in-tree"
          },
        ],
        "icon": "and-icon"
      }
    ]
    const result = flattenVariantCategoryContainerObject(nodes);
    expect(result).toEqual(
      [
        {
          "key": "1",
          "label": "And",
          "data": {
            "and": []
          },
          "children": [
            {
              "key": "1",
              "label": "Genomic",
              "data": {
                "type": 3,
                "formData": {
                  "variant_category": "Mutation",
                  "hugo_symbol": "A1BG"
                },
                "originalIndex": 0,
                "nodeLabel": "A1BG"
              },
              "icon": "genomic-icon in-tree"
            },
          ],
          "icon": "and-icon"
        }
      ]
    );
  });

  it('should flatten VariantCategoryContainerObject with subgroup nested object to CTML format', () => {
    const nodes = [
      {
        "key": "1",
        "label": "And",
        "data": {
          "and": []
        },
        "children": [
          {
            "key": "1",
            "label": "Genomic",
            "data": {
              "type": 3,
              "formData": {
                "variantCategoryContainerObject": {
                  "variant_category": "Mutation",
                  "hugo_symbol": "A1BGa"
                }
              },
              "originalIndex": 0,
              "nodeLabel": "A1BGa"
            },
            "icon": "genomic-icon in-tree"
          },
          {
            "key": "1",
            "label": "And",
            "data": {
              "and": [],
              "originalIndex": 1
            },
            "children": [
              {
                "key": "1",
                "label": "Genomic",
                "data": {
                  "type": 3,
                  "formData": {
                    "variantCategoryContainerObject": {
                      "variant_category": "CNV",
                      "hugo_symbol": "ZACN"
                    }
                  },
                  "originalIndex": 0,
                  "nodeLabel": "ZACN",
                  "formValid": true
                },
                "icon": "genomic-icon in-tree"
              }
            ],
            "icon": "and-icon"
          }
        ],
        "icon": "and-icon"
      }
    ];

    const result = flattenVariantCategoryContainerObject(nodes);
    expect(result).toEqual(
      [
        {
          "key": "1",
          "label": "And",
          "data": {
            "and": []
          },
          "children": [
            {
              "key": "1",
              "label": "Genomic",
              "data": {
                "type": 3,
                "formData": {
                  "variant_category": "Mutation",
                  "hugo_symbol": "A1BGa"
                },
                "originalIndex": 0,
                "nodeLabel": "A1BGa"
              },
              "icon": "genomic-icon in-tree"
            },
            {
              "key": "1",
              "label": "And",
              "data": {
                "and": [],
                "originalIndex": 1
              },
              "children": [
                {
                  "key": "1",
                  "label": "Genomic",
                  "data": {
                    "type": 3,
                    "formData": {
                      "variant_category": "CNV",
                      "hugo_symbol": "ZACN"
                    },
                    "originalIndex": 0,
                    "nodeLabel": "ZACN",
                    "formValid": true
                  },
                  "icon": "genomic-icon in-tree"
                }
              ],
              "icon": "and-icon"
            }
          ],
          "icon": "and-icon"
        }
      ]
    );
  });

  it('should add VariantCategoryContainerObject', () => {
    const matchCriteria = [
      {
        "and": [
          {
            "genomic": {
              "variant_category": "Mutation",
              "hugo_symbol": "A1BG"
            }
          }
        ]
      }
    ];

    const result = addVariantCategoryContainerObject(matchCriteria);
    const expected = [
      {
        "and": [
          {
            "genomic": {
              "variantCategoryContainerObject": {
                "variant_category": "Mutation",
                "hugo_symbol": "A1BG"
              }
            }
          }
        ]
      }
    ];
    expect(result).toEqual(expected);
  });


  it('should add VariantCategoryContainerObject with sub group nested object', () => {
    const matchCriteria = [
      {
        "and": [
          {
            "genomic": {
              "variant_category": "Mutation",
              "hugo_symbol": "A1BGa"
            }
          },
          {
            "and": [
              {
                "genomic": {
                  "variant_category": "CNV",
                  "hugo_symbol": "ZACN"
                }
              }
            ]
          }
        ]
      }
    ];
    const result = addVariantCategoryContainerObject(matchCriteria);
    const expected = [
      {
        "and": [
          {
            "genomic": {
              "variantCategoryContainerObject": {
                "variant_category": "Mutation",
                "hugo_symbol": "A1BGa"
              }
            }
          },
          {
            "and": [
              {
                "genomic": {
                  "variantCategoryContainerObject": {
                    "variant_category": "CNV",
                    "hugo_symbol": "ZACN"
                  }
                }
              }
            ]
          }
        ]
      }
    ];
    expect(result).toEqual(expected);
  });
});
