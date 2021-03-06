//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.
var Utils = require("./Utils");
var Constants = require("./Constants");
var nets = require("nets");

/**
 * @constructor
 * @param {string} baseURL - URL for the Open PHACTS API
 * @param {string} appID - Application ID for the application being used. Created by {@link https://dev.openphacts.org}
 * @param {string} appKey - Application Key for the application ID.
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author [Ian Dunlop]{@link https://github.com/ianwdunlop}
 */
PathwaySearch = function PathwaySearch(baseURL, appID, appKey) {
    this.baseURL = baseURL;
    this.appID = appID;
    this.appKey = appKey;
}

PathwaySearch.prototype.information = function(URI, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
    Utils.nets({
        url: this.baseURL + '/pathway?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        if (resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()).result);
        } else {
            callback.call(this, false, resp.statusCode);
        }
    });

}

PathwaySearch.prototype.byCompound = function(URI, organism, lens, page, pageSize, orderBy, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    organism ? params['organism'] = organism : '';
    lens ? params['_lens'] = lens : '';
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    //TODO order by neeeds an RDF like syntax to work eg ?cw_uri or DESC(?cw_uri), need to hide that
    //from users by having a descending flag and creating the correct syntax here
    orderBy ? params['_orderBy'] = orderBy : '';
    Utils.nets({
        url: this.baseURL + '/pathways/byCompound?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        if (resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()).result);
        } else {
            callback.call(this, false, resp.statusCode);
        }
    });

}

PathwaySearch.prototype.countPathwaysByCompound = function(URI, organism, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    organism ? params['pathway_organism'] = organism : '';
    lens ? params['_lens'] = lens : '';
    Utils.nets({
        url: this.baseURL + '/pathways/byCompound/count?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        if (resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()).result);
        } else {
            callback.call(this, false, resp.statusCode);
        }
    });

}

PathwaySearch.prototype.byTarget = function(URI, organism, lens, page, pageSize, orderBy, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    organism ? params['pathway_organism'] = organism : '';
    lens ? params['_lens'] = lens : '';
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    //TODO order by neeeds an RDF like syntax to work eg ?cw_uri or DESC(?cw_uri), need to hide that
    //from users by having a descending flag and creating the correct syntax here
    orderBy ? orderBy = params['_orderBy'] : '';
    Utils.nets({
        url: this.baseURL + '/pathways/byTarget?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        if (resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()).result);
        } else {
            callback.call(this, false, resp.statusCode);
        }
    });

}

PathwaySearch.prototype.countPathwaysByTarget = function(URI, organism, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    organism ? params['pathway_organism'] = organism : '';
    lens ? params['_lens'] = lens : '';
    Utils.nets({
        url: this.baseURL + '/pathways/byTarget/count?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        if (resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()).result);
        } else {
            callback.call(this, false, resp.statusCode);
        }
    });

}

/**
 * Get a list of targets that are part of the pathway specified
 * @param {string} URI - URI of the pathway (e.g.: "http://identifiers.org/wikipathways/WP1008")
 * @param {string} [lens] - The Lens name
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new PathwaySearch("https://beta.openphacts.org/2.1", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var targets = searcher.parseGetTargetsResponse(response);
 * };
 * searcher.getTargets('http://identifiers.org/wikipathways/WP1008', null, callback);
 */
PathwaySearch.prototype.getTargets = function(URI, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
    Utils.nets({
        url: this.baseURL + '/pathway/getTargets?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        if (resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()).result);
        } else {
            callback.call(this, false, resp.statusCode);
        }
    });

}

PathwaySearch.prototype.getCompounds = function(URI, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
    Utils.nets({
        url: this.baseURL + '/pathway/getCompounds?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        if (resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()).result);
        } else {
            callback.call(this, false, resp.statusCode);
        }
    });

}

/**
 * Give a list of interactions for the given pathway.
 *
 * @param {string} URI - URI of the pathway (e.g.: "http://identifiers.org/wikipathways/WP1015")
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 */
PathwaySearch.prototype.getInteractions = function(URI, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    Utils.nets({
        url: this.baseURL + '/pathway/getInteractions?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        // Handle responses where there is no resp/status code
        if (resp != null && resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()).result);
        } else if (resp != null) {
            callback.call(this, false, resp.statusCode);
        } else {
            callback.call(this, false, null);
        }
    });

}

PathwaySearch.prototype.byReference = function(URI, organism, lens, page, pageSize, orderBy, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    organism ? params['pathway_organism'] = organism : '';
    lens ? params['_lens'] = lens : '';
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    //TODO order by neeeds an RDF like syntax to work eg ?cw_uri or DESC(?cw_uri), need to hide that
    //from users by having a descending flag and creating the correct syntax here
    orderBy ? orderBy = params['_orderBy'] : '';
    Utils.nets({
        url: this.baseURL + '/pathways/byReference?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
	//Handle responses where there is no resp/status code
        if (resp != null && resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()).result);
        } else if (resp != null) {
            callback.call(this, false, resp.statusCode);
        } else {
            callback.call(this, false, null);
	}
    });

}

PathwaySearch.prototype.countPathwaysByReference = function(URI, organism, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    organism ? params['pathway_organism'] = organism : '';
    lens ? params['_lens'] = lens : '';
    Utils.nets({
        url: this.baseURL + '/pathways/byReference/count?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        if (resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()).result);
        } else {
            callback.call(this, false, resp.statusCode);
        }
    });

}

PathwaySearch.prototype.getReferences = function(URI, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
    Utils.nets({
        url: this.baseURL + '/pathway/getReferences?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        if (resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()).result);
        } else {
            callback.call(this, false, resp.statusCode);
        }
    });

}

PathwaySearch.prototype.countPathways = function(organism, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    organism ? params['pathway_organism'] = organism : '';
    lens ? params['_lens'] = lens : '';
    Utils.nets({
        url: this.baseURL + '/pathways/count?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        if (resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()).result);
        } else {
            callback.call(this, false, resp.statusCode);
        }
    });

}

/**
 * Give the count of interactions of the given entity (metabolite, gene, protein).
 *
 * @param {string} URI - URI of the compound (e.g.: "http://purl.obolibrary.org/obo/CHEBI_57305")
 * @param {string} [organism] - Restricts to pathways in this organism, if given
 * @param {string} [direction] - Only interactions of this direction (values: "up", "down").
 * @param {string} [interaction_type] - Only interactions of this type (values: "directed" "undirected").
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 */
PathwaySearch.prototype.countInteractionsByEntity = function(URI, organism, direction, interaction_type, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    organism ? params['pathway_organism'] = organism : '';
    organism ? params['organism'] = organism : '';
    organism ? params['direction'] = direction : '';
    organism ? params['interaction_type'] = interaction_type : '';
    Utils.nets({
        url: this.baseURL + '/pathways/interactions/byEntity/count?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        // Handle responses where there is no resp/status code
        if (resp != null && resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()).result);
        } else if (resp != null) {
            callback.call(this, false, resp.statusCode);
        } else {
            callback.call(this, false, null);
        }
    });

}

/**
 * Get a list of interactions of the given entity (metabolite, gene, protein).
 *
 * @param {string} URI - URI of the compound (e.g.: "http://purl.obolibrary.org/obo/CHEBI_57305")
 * @param {string} [organism] - Restricts to pathways in this organism, if given
 * @param {string} [direction] - Only interactions of this direction (values: "up", "down").
 * @param {string} [interaction_type] - Only interactions of this type (values: "directed" "undirected").
 * @param {string} [page=1] - Which page of records to return.
 * @param {string} [pageSize=10] - How many records to return. Set to 'all' to return all records in a single page
 * @param {string} [orderBy] - Order the records by this field eg ?assay_type or DESC(?assay_type)
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 */
PathwaySearch.prototype.getInteractionsByEntity = function(URI, organism, direction, interaction_type, page, pageSize, orderBy, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    organism ? params['pathway_organism'] = organism : '';
    direction ? params['direction'] = direction : '';
    interaction_type ? params['interaction_type'] = interaction_type : '';
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    orderBy ? params['_orderBy'] = orderBy : '';
    Utils.nets({
        url: this.baseURL + '/pathways/interactions/byEntity?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        // Handle responses where there is no resp/status code
        if (resp != null && resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()).result);
        } else if (resp != null) {
            callback.call(this, false, resp.statusCode);
        } else {
            callback.call(this, false, null);
        }
    });

}

PathwaySearch.prototype.list = function(organism, lens, page, pageSize, orderBy, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    organism ? params['pathway_organism'] = organism : '';
    lens ? params['_lens'] = lens : '';
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    //TODO order by neeeds an RDF like syntax to work eg ?cw_uri or DESC(?cw_uri), need to hide that
    //from users by having a descending flag and creating the correct syntax here
    orderBy ? orderBy = params['_orderBy'] : '';
    Utils.nets({
        url: this.baseURL + '/pathways?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        if (resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()).result);
        } else {
            callback.call(this, false, resp.statusCode);
        }
    });

}

PathwaySearch.prototype.organisms = function(lens, page, pageSize, orderBy, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    lens ? params['_lens'] = lens : '';
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    //TODO order by neeeds an RDF like syntax to work eg ?cw_uri or DESC(?cw_uri), need to hide that
    //from users by having a descending flag and creating the correct syntax here
    orderBy ? orderBy = params['_orderBy'] : '';
    Utils.nets({
        url: this.baseURL + '/pathways/organisms?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        if (resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()).result);
        } else {
            callback.call(this, false, resp.statusCode);
        }
    });

}

PathwaySearch.prototype.parseInformationResponse = function(response) {
    var constants = new Constants();
    var latest_version, identifier, revision, title, description, parts, inDataset, pathwayOntology, organism, organismLabel, about, URI = null;
    latest_version = response.primaryTopic.latest_version;
    identifier = response.primaryTopic[constants.ABOUT];
    URI = response.primaryTopic[constants.ABOUT];;
    title = latest_version.title ? latest_version.title : null;
    organism = latest_version.organism[constants.ABOUT] ? latest_version.organism[constants.ABOUT] : null;
    organismLabel = latest_version.organism.label ? latest_version.organism.label : null;
    pathwayOntology = latest_version.pathwayOntology ? latest_version.pathwayOntology : null;
    var pathwayOntologies = [];
    if (pathwayOntology) {
            Utils.arrayify(pathwayOntology).forEach(function(ontology, i) {
                pathwayOntologies.push(ontology);
            });
    }
    description = latest_version.description ? latest_version.description : null;
    revision = latest_version[constants.ABOUT] ? latest_version[constants.ABOUT] : null;
    var partsComplete = latest_version.hasPart ? latest_version.hasPart : null;
    var parts = [];
    partsComplete.forEach(function(part,  i) {
        parts.push({
            about: part["_about"],
            type: part.type
        });
    });
    // provenance
    var wikipathwaysProvenance = {};
    wikipathwaysProvenance['source'] = 'wikipathways';
    wikipathwaysProvenance['title'] = identifier;
    wikipathwaysProvenance['description'] = identifier;
    wikipathwaysProvenance['organismLabel'] = organism;
    return {
        'URI': URI,
        'title': title,
        'description': description,
        'identifier': identifier,
        'revision': revision,
        'pathwayOntologies': pathwayOntologies,
        'organism': organism,
        'organismLabel': organismLabel,
        'parts': parts,
        'wikipathwaysProvenance': wikipathwaysProvenance
    };
}

PathwaySearch.prototype.parseByCompoundResponse = function(response) {
    var constants = new Constants();
    var items = response.items;
    var pathways = [];
    items.forEach(function(item, i) {
        var title, identifier, organism, organismLabel, parts, about, type, prefLabel, description, pathwayOntology, geneProductLabel, geneProductURI, geneProductCWURI;
        title = item.title;
        identifier = item.identifier;
        parts = item.hasPart;
        about = parts[constants.ABOUT];
        type = parts.type;
        geneProductLabel = parts.exactMatch != null ? parts.exactMatch.prefLabel : null;
        geneProductURI = parts[constants.ABOUT];
        geneProductCWURI = parts.exactMatch != null ? parts.exactMatch[constants.ABOUT] : null;
        organism = item.pathway_organism[constants.ABOUT];
        organismLabel = item.pathway_organism.label;
        description = item.description ? item.description : null;
        pathwayOntology = item.pathwayOntology ? item.pathwayOntology : null;
        pathways.push({
            'title': title,
            'identifier': identifier,
            'description': description,
            'pathwayOntology': pathwayOntology,
            'organism': organism,
            'organismLabel': organismLabel,
            'geneProductLabel': geneProductLabel,
            'geneProductURI': geneProductURI,
            'geneProductCWURI': geneProductCWURI,
            'about': about
        });
    });
    return pathways;
}

PathwaySearch.prototype.parseCountPathwaysByCompoundResponse = function(response) {
    var constants = new Constants();
    return response.primaryTopic[constants.PATHWAY_COUNT];
}

PathwaySearch.prototype.parseByTargetResponse = function(response) {
    var constants = new Constants();
    var items = response.items;
    var pathways = [];
    items.forEach(function(item, i) {
        var title, identifier, organism, organismLabel, parts, about, type, prefLabel, description, pathwayOntology, geneProductLabel, geneProductURI, geneProductCWURI;
        var geneProducts = [];
        title = item.title;
        identifier = item.identifier;
        parts = item.hasPart;
        about = parts[constants.ABOUT];
        type = parts.type;
            Utils.arrayify(parts).forEach(function(part, index, array) {
                var geneProduct = {};
                geneProducts.push(geneProduct);
                geneProduct['URI'] = part[constants.ABOUT];
                var exactMatches = [];
                geneProduct['exactMatch'] = exactMatches;
                    Utils.arrayify(part.exactMatch).forEach(function(exactMatch, index, array) {
                        exactMatches.push({'label': exactMatch.prefLabel, 'URI': exactMatch[constants.ABOUT]});
                    });
            });
        organism = item.pathway_organism[constants.ABOUT];
        organismLabel = item.pathway_organism.label;
        description = item.description ? item.description : null;
        pathwayOntology = item.pathwayOntology ? item.pathwayOntology : null;
        pathways.push({
            'title': title,
            'identifier': identifier,
            'description': description,
            'pathwayOntology': pathwayOntology,
            'organism': organism,
            'organismLabel': organismLabel,
            'geneProducts': geneProducts,
            'about': about
        });
    });
    return pathways;
}

PathwaySearch.prototype.parseCountPathwaysByTargetResponse = function(response) {
    var constants = new Constants();
    return response.primaryTopic[constants.PATHWAY_COUNT];
}

PathwaySearch.prototype.parseGetTargetsResponse = function(response) {
    var constants = new Constants();
    var latest_version, revision, title, parts;
    latest_version = response.primaryTopic.latest_version;
    title = latest_version.title;
    revision = latest_version[constants.ABOUT];
    var partsComplete = latest_version.hasPart ? latest_version.hasPart : null;
    var geneProducts = [];
        Utils.arrayify(partsComplete).forEach(function(part, i) {
            geneProducts.push(part);
        });
    return {
        'title': title,
        'revision': revision,
        'geneProducts': geneProducts
    };
}

PathwaySearch.prototype.parseGetCompoundsResponse = function(response) {
    var constants = new Constants();
    var latest_version, revision, title, parts;
    latest_version = response.primaryTopic.latest_version;
    title = latest_version.title;
    revision = latest_version[constants.ABOUT];
    var partsComplete = latest_version.hasPart ? latest_version.hasPart : null;
    var metabolites = [];
        Utils.arrayify(partsComplete).forEach(function(part, i) {
            metabolites.push(part);
        });
    return {
        'title': title,
        'revision': revision,
        'metabolites': metabolites
    };
}

PathwaySearch.prototype.parseGetInteractionsResponse = function(response) {
    var constants = new Constants();
    var latest_version, revision, title, parts;
    latest_version = response.primaryTopic.latest_version;
    title = latest_version.title;
    revision = latest_version[constants.ABOUT];
    var partsComplete = latest_version.hasPart ? latest_version.hasPart : null;
    var interactions = [];
        Utils.arrayify(partsComplete).forEach(function(part, i) {
            about = part._about;
            type  = part.type;
            sources = part.source
            if (Array.isArray(sources)) {
                collapsed = []
                sources.forEach(function(source) {
                    collapsed.push(source._about)
                });
                sources = collapsed
            } else {
                iri = sources._about
                sources = [];
                sources[0] = iri
            }
            targets = part.target
            if (Array.isArray(targets)) {
                collapsed = []
                targets.forEach(function(target) {
                    collapsed.push(target._about)
                });
                targets = collapsed
            } else {
                iri = targets._about
                targets = [];
                targets[0] = iri
            }
            interactions.push({
                'type': type,
                 'source': sources,
                 'target': targets,
                'about': about
            });
        });
    return {
        'title': title,
        'revision': revision,
        'interactions': interactions
    };
}

PathwaySearch.prototype.parseByReferenceResponse = function(response) {
    var constants = new Constants();
    var items = response.items;
    var pathways = [];
    items.forEach(function(item, i) {
        var title, identifier, organism, organismLabel, parts, publication, prefLabel, description, pathwayOntology;
        title = item.title;
        identifier = item.identifier;
        parts = item.hasPart;
        publication = parts[constants.ABOUT];
        organism = item.pathway_organism[constants.ABOUT];
        organismLabel = item.pathway_organism.label;
        description = item.description ? item.description : null;
        pathwayOntology = item.pathwayOntology ? item.pathwayOntology : null;
        pathways.push({
            'title': title,
            'identifier': identifier,
            'description': description,
            'pathwayOntology': pathwayOntology,
            'organism': organism,
            'organismLabel': organismLabel,
            'publication': publication,
        });
    });
    return pathways;
}

PathwaySearch.prototype.parseCountPathwaysByReferenceResponse = function(response) {
    var constants = new Constants();
    return response.primaryTopic[constants.PATHWAY_COUNT];
}

PathwaySearch.prototype.parseGetReferencesResponse = function(response) {
    var constants = new Constants();
    var latest_version, revision, title, parts;
    latest_version = response.primaryTopic.latest_version;
    title = latest_version.title;
    revision = latest_version[constants.ABOUT];
    var partsComplete = latest_version.hasPart ? latest_version.hasPart : null;
    var references = [];
        Utils.arrayify(partsComplete).forEach(function(part, i) {
            references.push(part);
        });
    return {
        'title': title,
        'revision': revision,
        'references': references
    };
}
PathwaySearch.prototype.parseCountPathwaysResponse = function(response) {
    var constants = new Constants();
    return response.primaryTopic[constants.PATHWAY_COUNT];
}

PathwaySearch.prototype.parseInteractionsByEntityResponse = function(response) {
    var constants = new Constants();
    var items = response.items;
    var interactions = [];
    items.forEach(function(part, i) {
        about = part._about;
        type  = part.type;
        sources = part.source
        if (Array.isArray(sources)) {
            collapsed = []
            sources.forEach(function(source) {
                collapsed.push(source._about)
            });
            sources = collapsed
        } else {
            iri = sources._about
            sources = [];
            sources[0] = iri
        }
        targets = part.target
        if (Array.isArray(targets)) {
            collapsed = []
            targets.forEach(function(target) {
                collapsed.push(target._about)
            });
            targets = collapsed
        } else {
            iri = targets._about
            targets = [];
            targets[0] = iri
        }
        interactions.push({
            'type': type,
              'source': sources,
              'target': targets,
            'about': about
        });
    });
    return interactions;
}

PathwaySearch.prototype.parseCountInteractionsByEntityResponse = function(response) {
    return response.primaryTopic["interactions_count"];
}

PathwaySearch.prototype.parseListResponse = function(response) {
    var constants = new Constants();
    var items = response.items;
    var pathways = [];
    items.forEach(function(item, i) {
        var title, identifier, organism, organismLabel, parts, publication, prefLabel, description, pathwayOntology;
        title = item.title;
        identifier = item.identifier;
        organism = item.pathway_organism[constants.ABOUT];
        organismLabel = item.pathway_organism.label;
        description = item.description ? item.description : null;
        pathwayOntology = item.pathwayOntology ? item.pathwayOntology : null;
        pathways.push({
            'title': title,
            'identifier': identifier,
            'description': description,
            'pathwayOntology': pathwayOntology,
            'organism': organism,
            'organismLabel': organismLabel,
        });
    });
    return pathways;
}

PathwaySearch.prototype.parseOrganismsResponse = function(response) {
    var constants = new Constants();
    var items = response.items;
    var organisms = [];
        Utils.arrayify(items).forEach(function(item, i) {
            var URI, count, label;
            URI = item[constants.ABOUT];;
            count = item.pathway_count;
            label = item.label;
            organisms.push({
                'URI': URI,
                'count': count,
                'label': label
            });
        });
    return organisms;
}

exports.PathwaySearch = PathwaySearch;
